import React from "react";
import { Outlet } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { Typography } from "@material-tailwind/react";

const Sidebar = () => {
  return (
    <>
      <div className="flex">
        <div className="mt-10 mx-5 w-3/4">
          <Outlet />
        </div>
        {/* ÜYE OLMAYANLAR GÖRMEYECEKKKKK  Üye Editor Firma Admin */}
        <div className="mt-10 mx-5 w-1/4">
          <div className="flex flex-col items_center justify-center sm:w-[250px] h-fit p-5  bg-gray-100 border-2 ">
            <Typography variant="lead" className="text-2xl text-center">
              Sektöre Ulaşım
            </Typography>

            <div className="flex items-start m-2">
              <ul>
                <li className="flex items-center justify-start">
                  <BsDot />
                  <Typography variant="small" className="text-base ">
                    Sektör Firmaları
                  </Typography>

                  {/* Kişiye özel sayfalı FİRMALARLA ALAKALI SAYFALAR + Resim + Haberlere Benzeyecek + kategoriler ayrılacak + filtreleme*/}
                </li>
                <li className="flex items-center justify-start">
                  <BsDot />
                  <Typography variant="small" className="text-base ">
                    Sektör Akademisyenleri
                  </Typography>

                  {/* Tıbbı bitkilerle alakalı kişileri sayfalayan Ezcacılar ziraatçılar botanikçiler diğer profil sayfaları Köşe yazısı isterse  */}
                </li>
              </ul>
            </div>
            <Typography variant="lead" className="text-2xl text-center">
              Haberler
            </Typography>

            <div className="flex items-start m-3">
              <ul>
                <li className="flex items-center justify-start">
                  <BsDot />
                  <Typography variant="small" className="text-base ">
                    Sektörden Haberler
                  </Typography>
                  {/*  Sözcünün haberler Slideri  */}
                </li>
                <li className="flex items-center justify-start">
                  <BsDot />
                  <Typography variant="small" className="text-base ">
                    KöşeYazıları
                  </Typography>

                  {/*  Köşe yazıları filtreleme ilk son tarih ismi yazı konusu en çok izlenen  */}
                </li>
                <li className="flex items-center justify-start">
                  <BsDot />
                  <Typography variant="small" className="text-base ">
                    Bilimsel Makaleler
                  </Typography>

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
