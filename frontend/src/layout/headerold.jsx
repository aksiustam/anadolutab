import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  HomeIcon,
  InformationCircleIcon,
  PhoneIcon,
  ChartBarIcon,
  ChevronDownIcon,
  NewspaperIcon,
  EnvelopeIcon,
  PowerIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/userSlice";
import { useCookies } from "react-cookie";

const Header = () => {
  return <ComplexNavbar />;
};

// profile menu component
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeMenu = () => setIsMenuOpen(false);
  const [, , removeCookie] = useCookies(["jwt"]);
  const logout = () => {
    removeCookie("jwt");
    dispatch(setLogout());
    navigate("/");
    window.location.reload();
  };
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="md"
            alt="tania andrew"
            className="rounded-full border border-gray-900 p-0.5 "
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={5.5}
            className={`h-12 w-4 text-white transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      {isAuth ? (
        <MenuList className=" bg-green-700 border-none">
          <MenuItem
            onClick={closeMenu}
            className={`flex items-center my-1 gap-3 rounded text-gray-200 hover:text-gray-100`}
          >
            <UserCircleIcon className="h-6 w-6" />
            <NavLink to={"/Profil"} className={"text-base"}>
              Profil
            </NavLink>
          </MenuItem>
          <MenuItem
            onClick={closeMenu}
            className={`flex items-center my-1 gap-3 rounded text-gray-200 hover:text-gray-100`}
          >
            <EnvelopeIcon className="h-6 w-6" />
            <NavLink to={"/Profil/Mesajlar"} className={"text-base"}>
              Mesajlar
            </NavLink>
          </MenuItem>
          <MenuItem
            onClick={closeMenu}
            className={`flex items-center my-1 gap-3 rounded text-gray-200 hover:text-gray-100`}
          >
            <NewspaperIcon className="h-6 w-6" />
            <NavLink to={"/Profil/Makale"} className={"text-base"}>
              Makaleler
            </NavLink>
          </MenuItem>
          <MenuItem
            onClick={() => {
              closeMenu();
              logout();
            }}
            className={`flex items-center my-1 gap-3 rounded text-gray-200 hover:text-gray-100`}
          >
            <PowerIcon className="h-6 w-6" />
            <Typography className="text-base">Çıkış</Typography>
          </MenuItem>
        </MenuList>
      ) : (
        <MenuList className=" bg-green-700 border-none  ">
          <MenuItem
            onClick={closeMenu}
            className={`flex items-center my-1 gap-3 rounded-lg  text-gray-200 hover:text-gray-100`}
          >
            <UserCircleIcon className="h-6 w-6" />
            <NavLink to={"/Auth/Login"} className={"text-base"}>
              Giriş Yap
            </NavLink>
          </MenuItem>
          <MenuItem
            onClick={closeMenu}
            className={`flex items-center my-1 gap-3 rounded-lg  text-gray-200 hover:text-gray-100`}
          >
            <UserCircleIcon className="h-6 w-6" />
            <NavLink to={"/Auth/Register"} className={"text-base"}>
              Kayıt Ol
            </NavLink>
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
}

// nav list menu

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <MenuItem className="hidden items-center gap-2  lg:flex lg:rounded-full">
            <NewspaperIcon className="h-[18px] w-[18px]" />{" "}
            <Typography as="a" variant="small" className="font-normal">
              Haberler
            </Typography>
            <ChevronDownIcon
              strokeWidth={2}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </MenuItem>
        </MenuHandler>
        <MenuList className="hidden gap-3 bg-green-700 lg:flex border-none">
          <ul className=" flex w-full flex-col gap-3 mt-1">
            <MenuItem>
              <NavLink to={"/Haberler"}>
                <Typography className="font-normal mb-1 text-left hover:text-gray-100 text-gray-200">
                  Sektörden Haberler
                </Typography>
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to={"/Haberler"}>
                <Typography className="font-normal mb-1 text-left hover:text-gray-100 text-gray-200">
                  Köşe Yazıları
                </Typography>
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to={"/Haberler"}>
                <Typography className="font-normal mb-1 text-left hover:text-gray-100 text-gray-200">
                  Bilimsel Makaleler
                </Typography>
              </NavLink>
            </MenuItem>
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex  items-center gap-2 text-gray-200 lg:hidden">
        <NewspaperIcon className="h-[18px] w-[18px]" />{" "}
        <Typography as="a" variant="small" className="font-normal">
          Haberler
        </Typography>
      </MenuItem>
      <ul className="ml-10 flex w-full flex-col  lg:hidden">
        <MenuItem>
          <NavLink to={"/Haberler"}>
            <Typography
              className="font-normal mb-1 text-left text-gray-200"
              variant="small"
            >
              Sektörden Haberler
            </Typography>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to={"/Haberler"}>
            <Typography
              className="font-normal mb-1 text-left  text-gray-200"
              variant="small"
            >
              Köşe Yazıları
            </Typography>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to={"/Haberler"}>
            <Typography
              className="font-normal mb-1 text-left  text-gray-200"
              variant="small"
            >
              Bilimsel Makaleler
            </Typography>
          </NavLink>
        </MenuItem>
      </ul>
    </React.Fragment>
  );
}
// nav list component

function NavList() {
  return (
    <ul className="mb-4 mt-2 gap-2 flex flex-col lg:gap-3  lg:mb-0 lg:mt-0 lg:flex-row lg:items-start ">
      <NavLink to={"/"}>
        <MenuItem className="flex items-center gap-2 lg:rounded-full">
          <HomeIcon className="h-[18px] w-[18px]" />
          <Typography variant="small" className="font-normal">
            Anasayfa
          </Typography>
        </MenuItem>
      </NavLink>

      <NavLink to={"/Hakkımızda"}>
        <MenuItem className="flex items-center gap-2 lg:rounded-full">
          <InformationCircleIcon className="h-[18px] w-[18px]" />
          <Typography variant="small" className="font-normal">
            Hakkımızda
          </Typography>
        </MenuItem>
      </NavLink>

      <NavListMenu />

      <NavLink to={"/Borsa"}>
        <MenuItem className="flex items-center gap-2 lg:rounded-full">
          <ChartBarIcon className="h-[18px] w-[18px]" />
          <Typography variant="small" className="font-normal">
            Borsa
          </Typography>
        </MenuItem>
      </NavLink>

      <NavLink to={"/İletişim"}>
        <MenuItem className="flex items-center gap-2 lg:rounded-full">
          <PhoneIcon className="h-[18px] w-[18px]" />
          <Typography variant="small" className="font-normal">
            İletişim
          </Typography>
        </MenuItem>
      </NavLink>
    </ul>
  );
}

function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="bg-green-800 mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center text-gray-200 ">
        <NavLink to={"/"}>
          <div className="flex flex-col relative items-center justify-center">
            <div className="flex flex-col ml-5">
              <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-medium text-left">
                Anadolu Tıbbi Bitkiler Platformu
              </Typography>
            </div>
          </div>
        </NavLink>
        <div className="absolute  top-2/4 -right-12 hidden -translate-x-1/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>

        <IconButton
          size="lg"
          color="white"
          variant="text"
          onClick={toggleIsNavOpen}
          className="flex items-center justify-center ml-auto mr-5 lg:hidden"
        >
          <Bars3Icon className="h-8 w-8" />
        </IconButton>
        <ProfileMenu />
      </div>
      <Collapse open={isNavOpen}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
export default Header;
