import { Typography } from "@material-tailwind/react";
import React from "react";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <Typography variant="h1" className="h-48 text-9xl">
        401
      </Typography>
      <Typography variant="h5">
        Bu siteye girmeye yetkili deilsiniz...
      </Typography>
    </div>
  );
};

export default Unauthorized;
