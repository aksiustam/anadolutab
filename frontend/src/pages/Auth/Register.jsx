import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eError, setEError] = useState();
  const [check, setCheck] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { isRegAuth, error, loading } = useSelector((state) => state.user);
  const onSignup = async () => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!data.email.match(regex)) {
      setEError("Email yanlış girdiniz");
      return;
    }
    if (data.name === "") {
      setEError("Ad giriniz");
      return;
    }
    if (data.password === "") {
      setEError("Şifre Giriniz");
      return;
    }
    if (!check) {
      setEError("Kutucuğu İşaretleyin");
      return;
    }

    setEError(false);
    dispatch(register(data));
  };
  useEffect(() => {
    if (isRegAuth) {
      setTimeout(function () {
        navigate("/auth/login");
      }, 3000);
    }
  }, [navigate, isRegAuth]);
  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="flex items-center justify-center">
      <Card color="transparent" shadow={false} className=" p-5 ">
        <Typography variant="h4" color="blue-gray">
          Kayıt Ol
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Kullanıcı Bilgilerini Giriniz...
        </Typography>
        <Typography color="red">
          {isRegAuth
            ? "Başarıyla Kaydoldunuz."
            : loading
            ? "Loading..."
            : eError
            ? eError
            : error?.message}
        </Typography>

        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
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
            onChange={() => setCheck(!check)}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <Link
                  to={"/"}
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </Link>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth onClick={onSignup}>
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
