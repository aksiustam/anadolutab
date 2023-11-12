import React from "react";
import Banner from "../../Public/Banner.jpg";
import { Typography } from "@material-tailwind/react";
import { Container } from "react-bootstrap";
const Home = () => {
  //const dispatch = useDispatch();
  return (
    <Container>
      <div className="flex flex-col justify-center items-center ">
        <img
          className=" w-full object-cover object-center"
          src={Banner}
          alt="banner"
        />
        <div className="flex flex-col mt-3 items-center justify-center gap-4">
          <Typography variant="h5">Sektörün Merkezi Olmaya Adayız</Typography>
        </div>
      </div>
    </Container>
  );
};

export default Home;
