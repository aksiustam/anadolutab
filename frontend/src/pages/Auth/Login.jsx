import React, { useState } from "react";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userSlice";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["jwt"]);
  const [eError, setEError] = useState();
  const { user, token, isAuth, error, loading } = useSelector(
    (state) => state.user
  );
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSignin = () => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!data.email.match(regex)) {
      setEError("Email yanlış girdiniz");
      return;
    }
    if (data.password === "") {
      setEError("Şifre Giriniz");
      return;
    }
    setEError(false);
    if (!cookies?.jwt) dispatch(login(data));
  };

  useEffect(() => {
    if (isAuth) {
      let expires = new Date();
      expires.setTime(expires.getTime() + 60 * 60 * 24 * 7 * 1000);
      setCookie("jwt", token, { path: "/", expires: expires });
      setTimeout(function () {
        navigate("/");
      }, 3000);
    }
  }, [isAuth, navigate, setCookie, token]);
  return (
    <div className="flex items-center justify-center">
      <Card color="transparent" shadow={false} className="p-5">
        <Typography variant="h4" color="blue-gray">
          Giriş Yap
        </Typography>

        <Typography color="red">
          {isAuth
            ? "Hoşgeldiniz..." + user.name
            : loading
            ? "Loading..."
            : eError
            ? eError
            : error?.message}
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input onChange={onChange} name="email" size="lg" label="Email" />
            <Input
              onChange={onChange}
              name="password"
              type="password"
              size="lg"
              label="Şifre"
            />
          </div>

          <Button className="mt-6" fullWidth onClick={onSignin}>
            Giriş Yap
          </Button>
        </form>

        <Typography variant="small" className="mt-4 text-center font-normal">
          Kayıtlı Değil Misin ?{" "}
          <NavLink to={"/Auth/Register"} className={"ml-1 font-bold"}>
            Kayıt Ol
          </NavLink>
        </Typography>
      </Card>
    </div>
  );
};

export default Login;
