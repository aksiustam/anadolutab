import React from "react";

const EditorCard = (params) => {
  const { editor } = params;
  return (
    <div className="flex flex-col items-center justify-center w-[250px] p-3 border gap-3 cursor-pointer bg-slate-100">
      <div className="mb-5 border border-stone-500 p-3 rounded-full">
        <img
          className="w-32 h-32"
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="hey"
        />
      </div>
      <div className="text-lg -mt-3">{editor.name}</div>
      <hr className="border border-gray-600 w-24" />
      <div className="text-lg text-center font-semibold">{editor.baslik}</div>
      <div className="text-sm">{editor.tarih}</div>
    </div>
  );
};

export default EditorCard;
