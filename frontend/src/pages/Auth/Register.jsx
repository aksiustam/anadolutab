import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
const Register = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    success: false,
    error: false,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSignup = (e) => {
    e.preventDefault();

    const { email, password, name } = data;
    console.log(data);
    // axios({
    //   url: "/auth/register",
    //   method: "POST",
    //   data: { email, password, first_name, last_name },
    // })
    //   .then((res) => {
    //     window.localStorage.setItem("isAuthenticated", true);
    //     if (res.status === 200) {
    //       this.setState({ success: true, error: false });
    //       this.props.history.push("/");
    //     }
    //   })
    //   .catch(({ response }) => {
    //     this.setState({ error: response.data.message, success: false });
    //   });
  };
  return (
    <div className="flex items-center justify-center m-5">
      <Card color="transparent" shadow={false} className=" p-5 ">
        <Typography variant="h4" color="blue-gray">
          Kayıt Ol
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Kullanıcı Bilgilerini Giriniz...
        </Typography>
        {data.success && "You've registered in successfully"}
        {data.error}
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={() => onSignup()}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input onChange={onChange} name="name" size="lg" label="Ad Soyad" />
            <Input onChange={onChange} name="email" size="lg" label="Email" />
            <Input
              onChange={onChange}
              name="password"
              type="password"
              size="lg"
              label="Şifre"
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth>
            Kayıt Ol
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Bizde Kayıtlı Mısın?{" "}
            <NavLink to={"/Auth/Login"} className="font-medium text-gray-900">
              Giriş Yap
            </NavLink>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Register;
