import React from "react";
import insaat from "../../Public/insaat.jpg";
const İletisim = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div>Yapım Aşamasında</div>
      <img
        className="h-48 w-full object-cover object-center"
        src={insaat}
        alt="banner"
      />
    </div>
  );
};

export default İletisim;
