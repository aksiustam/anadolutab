import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../redux/productSlice";
import Slider from "react-slick";
import { Typography } from "@material-tailwind/react";
import fidan from "../Public/fidan.jpg";
const Detail = () => {
  const { id } = useParams();
  const { product } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex flex-row justify-center m-4">
      <div className="flex justify-center items-center m-4 ">
        {product && (
          <div className="w-[450px]">
            <Slider {...settings}>
              <img
                className="h-72 w-full object-cover object-center"
                src={fidan}
                alt=""
              />
              <img
                className="h-72 w-full object-cover object-center"
                src={fidan}
                alt=""
              />
            </Slider>
          </div>
        )}
      </div>
      <div className="flex flex-col m-4 gap-3">
        <Typography variant="h3">{product?.name}</Typography>
        <div className="flex items-center  gap-3">
          <Typography>Latin Adı : {product?.latinname}</Typography>
          <Typography>Kategori : {product?.category}</Typography>
        </div>
        <div className="flex items-center  gap-3">
          <Typography>Ingredient : {product?.ingredient}</Typography>
          <Typography>Usedtype : {product?.usedtype}</Typography>
        </div>
        <div className="flex items-center  gap-3">
          {product?.price?.map((item, i) => (
            <Typography key={i}>
              {i + 2022} Fiyatı : {item.priceout} TL
            </Typography>
          ))}
        </div>

        <Typography variant="paragraph">{product?.description}</Typography>
      </div>
    </div>
  );
};

export default Detail;
