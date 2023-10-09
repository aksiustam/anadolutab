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
        {/* ÜYE OLMAYANLAR GÖRMEYECEKKKKK  Üye Editor Firma Admin */}
        <div className="sm:flex hidden mt-10 mx-5 ">
          <div className="flex flex-col items_center justify-center sm:w-[250px] h-fit p-5  bg-gray-100 border-2 ">
            <div className="text-2xl text-center">Sektöre Ulaşım</div>

            <div className="flex items-start m-3">
              <ul>
                <li className="flex items-center justify-center">
                  <BsDot />
                  Sektör Firmaları
                  {/* Kişiye özel sayfalı FİRMALARLA ALAKALI SAYFALAR + Resim + Haberlere Benzeyecek + kategoriler ayrılacak + filtreleme*/}
                </li>
                <li className="flex items-center justify-center">
                  <BsDot />
                  Sektör Akademisyenleri
                  {/* Tıbbı bitkilerle alakalı kişileri sayfalayan Ezcacılar ziraatçılar botanikçiler diğer profil sayfaları Köşe yazısı isterse  */}
                </li>
              </ul>
            </div>
            <div className="text-2xl text-center mt-3">Haberler</div>
            <div className="flex items-start m-3">
              <ul>
                <li className="flex items-center justify-center">
                  <BsDot />
                  Sektörden Haberler {/*  Sözcünün haberler Slideri  */}
                </li>
                <li className="flex items-center justify-center">
                  <BsDot />
                  KöşeYazıları{" "}
                  {/*  Köşe yazıları filtreleme ilk son tarih ismi yazı konusu en çok izlenen  */}
                </li>
                <li className="flex items-center justify-center">
                  <BsDot />
                  Bilimsel Makaleler{" "}
                  {/*  Dergipark Api sindan datalar gelsin */}
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
