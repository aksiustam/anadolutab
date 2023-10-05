import React, { useState } from "react";

import TableComp from "../../components/TableComp";

const Borsa = () => {
  const [activetable, setActiveTable] = useState("sabit");

  return (
    <>
      <div className="flex flex-wrap items-center justify-evenly">
        <div
          onClick={() => setActiveTable("sabit")}
          className={`${
            activetable === "sabit" ? "bg-green-600" : "bg-green-800"
          } m-3 px-5 py-3 rounded-full cursor-pointer border-2 border-grey text-2xl text-white`}
        >
          Sabit Yağlar
        </div>
        <div
          onClick={() => setActiveTable("ucucu")}
          className={`${
            activetable === "ucucu" ? "bg-green-600" : "bg-green-800"
          } m-3 px-5 py-3 rounded-full cursor-pointer border-2 border-grey text-2xl text-white`}
        >
          Uçucu Yağlar
        </div>
        <div
          onClick={() => setActiveTable("drog")}
          className={`${
            activetable === "drog" ? "bg-green-600" : "bg-green-800"
          } m-3 px-5 py-3 rounded-full cursor-pointer border-2 border-grey text-2xl text-white`}
        >
          Droglar
        </div>
        <div
          onClick={() => setActiveTable("tohum")}
          className={`${
            activetable === "tohum" ? "bg-green-600" : "bg-green-800"
          } m-3 px-5 py-3 rounded-full cursor-pointer border-2 border-grey text-2xl text-white`}
        >
          Tohumlar
        </div>
      </div>
      <div>
        <TableComp activetable={activetable} />
      </div>
    </>
  );
};

export default Borsa;
