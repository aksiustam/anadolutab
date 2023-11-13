import React, { useState } from "react";
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
  Card,
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
  XMarkIcon,
  Bars3Icon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const Header = () => {
  return <NavbarSimple />;
};

// nav list menu
const navListMenuItems = [
  {
    title: "Sektörden Haberler",
    description: "Kendi Sektörümüzün Haberleri",
  },
  {
    title: "Köşe Yazıları",
    description: "Sitemizin Akademisyenlerinin Makaleleri",
  },
  {
    title: "Bilimsel Makaleler",
    description: "Bilimsel Makale Arattırma Yeri",
  },
];

// profile menu component
const profileMenuItems = [
  {
    label: "Profil",
    icon: UserCircleIcon,
  },
  {
    label: "Mesajlar",
    icon: EnvelopeIcon,
  },
  {
    label: "Makaleler",
    icon: NewspaperIcon,
  },
  {
    label: "Çıkış",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const { isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen}>
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
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 text-white transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {isAuth ? (
          profileMenuItems.map(({ label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                {isLastItem ? (
                  <div onClick={logout}>
                    <Typography
                      as="span"
                      variant="small"
                      className="font-normal"
                      color={isLastItem ? "red" : "inherit"}
                    >
                      {label}
                    </Typography>
                  </div>
                ) : (
                  <Typography
                    as="span"
                    variant="small"
                    className="font-normal"
                    color={isLastItem ? "red" : "inherit"}
                  >
                    {label}
                  </Typography>
                )}
              </MenuItem>
            );
          })
        ) : (
          <div>
            <MenuItem
              onClick={closeMenu}
              className={"flex items-center gap-2 rounded"}
            >
              <NavLink to={"/Auth/Login"} className={"text-base"}>
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={"inherit"}
                >
                  Giriş Yap
                </Typography>
              </NavLink>
            </MenuItem>
            <MenuItem
              onClick={closeMenu}
              className={"flex items-center gap-2 rounded"}
            >
              <NavLink to={"/Auth/Register"} className={"text-base"}>
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={"inherit"}
                >
                  Kayıt Ol
                </Typography>
              </NavLink>
            </MenuItem>
          </div>
        )}
      </MenuList>
    </Menu>
  );
}
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const renderLargeItems = navListMenuItems.map(({ title, description }) => (
    <div key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </div>
  ));
  const renderMinItems = navListMenuItems.map(({ title, description }) => (
    <div key={title}>
      <MenuItem>
        <Typography variant="h6" color="white" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </div>
  ));

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography
            as="li"
            variant="small"
            color="white"
            className="p-1 font-medium"
          >
            <NavLink
              to={"/"}
              className="hidden lg:flex items-center gap-2  hover:text-blue-500 transition-colors"
            >
              <NewspaperIcon className="h-[18px] w-[18px]" />
              Haberler{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </NavLink>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderLargeItems}
          </ul>
        </MenuList>
      </Menu>
      <NavLink to={"/"} className="flex lg:hidden items-center gap-2 -mt-3">
        <Typography
          as="li"
          variant="small"
          color="white"
          className="p-1 font-medium flex gap-2  hover:text-blue-500 transition-colors"
        >
          <NewspaperIcon className="h-[18px] w-[18px]" />
          Haberler{" "}
        </Typography>
      </NavLink>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderMinItems}
      </ul>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <NavLink
          to={"/"}
          className="flex items-center gap-2 hover:text-blue-500 transition-colors"
        >
          <HomeIcon className="h-[18px] w-[18px] mb-1" />
          Anasayfa
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <NavLink
          to={"/Hakkımızda"}
          className="flex items-center gap-2 hover:text-blue-500 transition-colors"
        >
          <InformationCircleIcon className="h-[18px] w-[18px] mb-1" />
          Hakkımızda
        </NavLink>
      </Typography>
      <NavListMenu />
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <NavLink
          to={"/Borsa"}
          className="flex items-center gap-2 hover:text-blue-500 transition-colors"
        >
          <ChartBarIcon className="h-[18px] w-[18px] mb-1" />
          Borsa
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <NavLink
          to={"/İletişim"}
          className="flex items-center gap-2 hover:text-blue-500 transition-colors"
        >
          <PhoneIcon className="h-[18px] w-[18px] mb-1" />
          İletişim
        </NavLink>
      </Typography>
    </ul>
  );
}

function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto bg-green-900/70 pt-5 px-6 pb-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          variant="h6"
          color="white"
          className="mr-4 cursor-pointer py-1.5"
        >
          <NavLink to={"/"}>Anadolu Tıbbi Bitkiler Platformu</NavLink>
        </Typography>
        <div className="flex items-center">
          <div className="hidden lg:block">
            <NavList />
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit text-white hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
          <div className="ml-5 ">
            <ProfileMenu />
          </div>
        </div>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
export default Header;
