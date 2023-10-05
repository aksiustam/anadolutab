import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../redux/productSlice";
import Slider from "react-slick";
import Button from "../components/Button";

const Detail = () => {
  const { id } = useParams();
  const { product } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(getProductDetail(id));
  }, [dispatch, id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const addBasket = () => {};

  const decrement = () => {
    setQuantity(quantity - 1);
  };
  const increment = () => {
    setQuantity(quantity + 1);
  };

  console.log(product);
  return (
    <div className="">
      <div className="flex justify-center mt-4 gap-7">
        {product && (
          <div className="w-[650px]">
            <Slider {...settings}>
              {product?.images?.map((image, i) => (
                <img key={i} src={image.url} alt="" />
              ))}
            </Slider>
          </div>
        )}
        <div className="space-y-3">
          <div className="text-3xl">{product?.name}</div>
          <div className="text-xl">{product?.latinname}</div>
          {product?.stock > 0 ? (
            <div className="text-xl">Stok Sayısı: {product?.stock}</div>
          ) : (
            <div>Ürün Stoklarda yoktur.</div>
          )}
          <div className="text-xl">Kategori : {product?.category}</div>
          <div className="flex items-center gap-5">
            <div onClick={decrement} className="text-3xl cursor-pointer">
              -
            </div>
            <div className="text-2xl">{quantity}</div>
            <div onClick={increment} className="text-3xl cursor-pointer">
              +
            </div>
          </div>
          <Button name={"Sepete Ekle"} onClick={addBasket} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
