import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import logo from "../Public/logo.jpg";

export const navLinks = [
  {
    id: "anasayfa",
    title: "Anasayfa",
    to: "/",
  },
  {
    id: "hakkımızda",
    title: "Hakkımızda",
    to: "/Hakkımızda",
  },
  {
    id: "haberler",
    title: "Haberler",
    to: "/Haberler",
  },
  {
    id: "borsa",
    title: "Borsa",
    to: "/Borsa",
  },
  {
    id: "iletişim",
    title: "İletişim",
    to: "/İletişim",
  },
];

export const profileLinks = [
  { id: "profil", title: "Profil", to: "/profil" },
  { id: "admin", title: "Admin", to: "/admin" },
  { id: "çıkış", title: "Çıkış", to: "/logout" },
];

const Header = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [active, setActive] = useState("Anasayfa");
  const [toggle, setToggle] = useState(false);

  //w-full flex py-6 justify-between items-center navbar
  //bg-green-500 h-16 px-5 flex items-center justify-between
  return (
    <div className="w-full flex py-5 justify-between items-center navbar">
      <div className="flex flex-col relative items-center  justify-start">
        <h1 className="sm:absolute text-3xl text-white mr-5 ">
          <img className="w-24" src={logo} alt="logo" />
        </h1>
        <div className="text-xl sm:flex flex-col  hidden text-left mr-5">
          <div>Anadolu Tıbbi</div>
          <div>Aromatik Bitkiler</div>
        </div>
      </div>
      {/* Desktop Navigation */}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-6"}`}
            onClick={() => setActive(nav.title)}
          >
            <NavLink to={nav.to}>{nav.title}</NavLink>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        {toggle ? (
          <AiOutlineClose
            size={36}
            onClick={() => {
              setToggle(!toggle);
              setOpenProfile(false);
            }}
          />
        ) : (
          <GiHamburgerMenu
            size={36}
            onClick={() => {
              setToggle(!toggle);
              setOpenProfile(false);
            }}
          />
        )}

        {/* Sidebar */}
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
              >
                <NavLink
                  to={nav.to}
                  onClick={() => {
                    setActive(nav.title);
                    setToggle(false);
                    setOpenProfile(false);
                  }}
                >
                  {nav.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Profile  */}

      <CgProfile
        className="sm:left-4 right-24 relative "
        size={36}
        color="white"
        onClick={() => {
          setOpenProfile(!openProfile);
          setToggle(false);
        }}
      />

      <div
        className={`${
          !openProfile ? "hidden" : "flex"
        } p-6 bg-black absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
      >
        <ul className="list-none flex justify-end items-start flex-1 flex-col">
          {profileLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-medium cursor-pointer text-[16px] text-dimWhite
                ${index === profileLinks.length - 1 ? "mb-0" : "mb-4"}`}
            >
              <NavLink to={nav.to}>{nav.title}</NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* <div className="sm:block sm:left-2 right-24 relative ">
        
        {openMenu && (
          <div className="absolute right-0 mt-3 w-[200px] bg-black">
            {menuItems.map((item, i) => (
              <div key={i} className="px-2 py-1 hover:bg-gray-200">
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Header;
