import { Typography } from "@material-tailwind/react";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <Typography variant="h1" className="h-48 text-9xl">
        404
      </Typography>
      <Typography variant="h5">Aradığınız Site Bulunamamaktadır.</Typography>
    </div>
  );
};

export default NotFound;
