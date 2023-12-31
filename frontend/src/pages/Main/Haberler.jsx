import React from "react";
import insaat from "../../Public/insaat.jpg";

const Haberler = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="text-3xl m-5">Editörler</div>
      <div>Yapım Aşamasında</div>
      <img
        className="h-48 w-full object-cover object-center"
        src={insaat}
        alt="banner"
      />
    </div>
  );
};

export default Haberler;
