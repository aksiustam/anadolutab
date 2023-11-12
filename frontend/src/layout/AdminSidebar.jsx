import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside
      className={` bg-blue-gray-800 fixed  z-50 my-4 ml-4 h-[calc(100vh-32px)] w-48 rounded-xl  `}
    >
      <div className={`relative border-b  border-white/20 `}>
        <Link to="/admin" className="flex flex-col items-start  py-6 px-8">
          <Typography variant="h6" color="white">
            Anadolu TAB
          </Typography>
          <Typography variant="h6" color="white">
            Admin Paneli
          </Typography>
        </Link>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          <li>
            <NavLink to={`/Admin`}>
              <Button
                variant="text"
                color="white"
                className="flex items-center gap-4 capitalize"
                fullWidth
              >
                <Typography
                  variant="small"
                  color="white"
                  className="font-black uppercase opacity-75"
                >
                  Home
                </Typography>
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/Admin/Tablo`}>
              <Button
                variant="text"
                color="white"
                className="flex items-center gap-4 capitalize"
                fullWidth
              >
                <Typography
                  variant="small"
                  color="white"
                  className="font-black uppercase opacity-75"
                >
                  Tablolar
                </Typography>
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/Admin/User`}>
              <Button
                variant="text"
                color="white"
                className="flex items-center gap-4 capitalize"
                fullWidth
              >
                <Typography
                  variant="small"
                  color="white"
                  className="font-black uppercase opacity-75"
                >
                  Üyeler
                </Typography>
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/Admin/Ayarlar`}>
              <Button
                variant="text"
                color="white"
                className="flex items-center gap-4 capitalize"
                fullWidth
              >
                <Typography
                  variant="small"
                  color="white"
                  className="font-black uppercase opacity-75"
                >
                  Ayarlar
                </Typography>
              </Button>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;
