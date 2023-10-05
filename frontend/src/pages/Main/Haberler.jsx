import React from "react";
import EditorCard from "../../components/EditorCard";

const Haberler = () => {
  const data = [
    {
      name: "Kullanıcı",
      mail: "kullanıcı@gmail.com",
      baslik: "Deneme Deneme Deneme Deneme",
      tarih: "4 Ekim 2023",
    },
    {
      name: "Kullanıcı",
      mail: "kullanıcı@gmail.com",
      baslik: "Deneme Deneme Deneme Deneme",
      tarih: "4 Ekim 2023",
    },
    {
      name: "Kullanıcı",
      mail: "kullanıcı@gmail.com",
      baslik: "Deneme Deneme Deneme Deneme",
      tarih: "4 Ekim 2023",
    },
    {
      name: "Kullanıcı",
      mail: "kullanıcı@gmail.com",
      baslik: "Deneme Deneme Deneme Deneme",
      tarih: "4 Ekim 2023",
    },
    {
      name: "Kullanıcı",
      mail: "kullanıcı@gmail.com",
      baslik: "Deneme Deneme Deneme Deneme",
      tarih: "4 Ekim 2023",
    },
    {
      name: "Kullanıcı",
      mail: "kullanıcı@gmail.com",
      baslik: "Deneme Deneme Deneme Deneme",
      tarih: "4 Ekim 2023",
    },
  ];

  return (
    <div>
      <div className="text-3xl m-5">Editörler</div>
      <div className="flex flex-wrap justify-center gap-12">
        {data.map((item, i) => (
          <EditorCard key={i} editor={item} />
        ))}
      </div>
    </div>
  );
};

export default Haberler;
