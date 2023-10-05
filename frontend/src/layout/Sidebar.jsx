import React from "react";
import { Outlet } from "react-router-dom";
import { BsDot } from "react-icons/bs";

const Sidebar = () => {
  return (
    <>
      <div className="flex flex-row justify-between ml-5">
        <div className="mt-10 mx-5">
          <Outlet />
        </div>

        <div className="sm:flex hidden mt-10 mx-5 ">
          <div className="flex flex-col items_center justify-center sm:w-[250px] h-fit p-5  bg-gray-100 border-2 ">
            <div className="text-2xl text-center">Sektörden Haberler</div>

            <div className="flex items-start m-3">
              <ul>
                <li className="flex items-center justify-center">
                  <BsDot />
                  Code 1
                </li>
                <li className="flex items-center justify-center">
                  <BsDot />
                  Code 2
                </li>
                <li className="flex items-center justify-center">
                  <BsDot />
                  Code 3
                </li>
              </ul>
            </div>
            <div className="text-2xl text-center mt-3">Sektörden Haberler</div>
            <div className="flex items-start m-3">
              <ul>
                <li className="flex items-center justify-center">
                  <BsDot />
                  Code 1
                </li>
                <li className="flex items-center justify-center">
                  <BsDot />
                  Code 2
                </li>
                <li className="flex items-center justify-center">
                  <BsDot />
                  Code 3
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
