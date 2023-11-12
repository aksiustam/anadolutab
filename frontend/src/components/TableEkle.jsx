import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const TableEkle = () => {
  const [category, setCategory] = useState();
  const [error, SetError] = useState({});
  const { token } = useSelector((state) => state.user);
  const [data, setData] = useState({
    name: "",
    latinname: "",
    usedtype: "",
    ingredient: "",
    description: "",
    price2022: "",
    price2023: "",
    category: "",
  });
  const refreshPage = () => {
    window.location.reload();
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const validateData = (data) => {
    const errors = {};

    if (!data.name) {
      errors.name = "Name field is required.";
    }
    if (!data.latinname) {
      errors.latinname = "Latin Name field is required.";
    }
    if (!data.usedtype) {
      errors.usedtype = "Used Type field is required.";
    }
    if (!data.ingredient) {
      errors.ingredient = "Ingredient field is required.";
    }
    if (!data.description) {
      errors.description = "Description field is required.";
    }
    if (!data.price2022) {
      errors.price2022 = "Price 2022 field is required.";
    }
    if (!data.price2023) {
      errors.price2023 = "Price 2023 field is required.";
    }
    if (!data.category) {
      errors.category = "Category field is required.";
    }

    return errors;
  };

  const onSumbit = async () => {
    setData({ ...data, category: category });
    const errors = validateData(data);

    if (Object.keys(errors).length > 0) {
      SetError(errors);
    } else {
      SetError("");

      await axios
        .post("https://api.anadolutab.com/product/new", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          SetError("Başarıyla Eklediniz");
        })
        .catch((err) => {
          console.log(err.response);
          console.log(err.response.data.message);
        });
    }
  };
  return (
    <div className="flex flex-col h-max gap-3 ">
      <div
        onClick={refreshPage}
        className="m-3 border-2 rounded-full flex flex-col items-center p-3 justify-center hover:bg-blue-gray-100 cursor-pointer"
      >
        <div>Tabloya Ürün Ekle</div>
        <div>
          {Object.keys(error).map((fieldName) => (
            <span key={fieldName} className="text-red-900 mx-2 text-xs">
              {error[fieldName]}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <Input
          onChange={onChange}
          name="name"
          size="lg"
          label="Adı"
          className="rounded-full"
        />
        <Input
          onChange={onChange}
          name="latinname"
          size="lg"
          label="LatinAdı"
          className="rounded-full"
        />
        <Input
          onChange={onChange}
          name="usedtype"
          size="lg"
          label="usedtype"
          className="rounded-full"
        />
        <Input
          onChange={onChange}
          name="ingredient"
          size="lg"
          label="ingredient"
          className="rounded-full"
        />
      </div>
      <div className="flex items-center justify-center gap-3">
        <div className="m-5 ">
          <Select
            className="form-select"
            label="Kategoriler"
            onChange={(e) => setCategory(e)}
          >
            <Option value="Sabit Yağlar">Sabit Yağlar</Option>
            <Option value="Uçucu Yağlar">Uçucu Yağlar</Option>
            <Option value="Droglar">Droglar</Option>
            <Option value="Tohumlar">Tohumlar</Option>
            <Option value="Baharatlar">Baharatlar</Option>
            <Option value="Diğer Kategoriler">Diğer Kategoriler</Option>
          </Select>
        </div>
        <Textarea
          onChange={onChange}
          name="description"
          size="lg"
          label="Açıklama"
        />
        <div className="flex flex-col items-center justify-center gap-3">
          <Input
            onChange={onChange}
            name="price2022"
            size="lg"
            label="price-2022"
            className="rounded-full"
          />
          <Input
            onChange={onChange}
            name="price2023"
            size="lg"
            label="price-2023"
            className="rounded-full"
          />
        </div>

        <Button
          onClick={onSumbit}
          className="h-full flex items-center justify-center"
        >
          EKLE
        </Button>
      </div>
    </div>
  );
};

export default TableEkle;
