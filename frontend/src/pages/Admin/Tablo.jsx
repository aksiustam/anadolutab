import React from "react";
import TableEkle from "../../components/TableEkle";
import AdminTable from "../../components/AdminTable";

const Tablo = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <TableEkle />
        <AdminTable />
      </div>
    </>
  );
};

export default Tablo;
