import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  const [data, setData] = useState();
  const click = async () => {
    try {
      await axios
        .get("http://localhost:5000/user/detail", { withCredentials: true })
        .then((res) => {
          const datas = res.data;
          setData(datas);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
  //const dispatch = useDispatch();
  return (
    <>
      <div>
        <div>{user?.name}</div>
        <div onClick={click}>RESİM</div>
        <div>{data}</div>

        <div>SİTEMİZ SEKTÖRÜN KALBİDİR</div>
        <div>ÜYE OLMAYANLAR GİREMEZ</div>
      </div>
    </>
  );
};

export default Home;
