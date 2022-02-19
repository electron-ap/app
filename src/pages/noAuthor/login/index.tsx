import React, { FC } from "react";
import { loginFormParam } from "./config";
import DynamicForm from "components/form";
import { useAuth } from "libs/context/authorityProvider";
import { useBackground } from "libs/hooks";
import "pages/noAuthor/login/loginStyle/index.scss";
import logo512 from "assets/static/logo512.png";
import loginBg from "assets/static/logo-bg.jpg";

const Login: FC = () => {
  const { loginImplement } = useAuth();
  const onConfirm = (...args: Parameters<typeof loginImplement>) =>
    loginImplement(...args);

  useBackground("#eff3fc");

  return (
    <div className={"loginComponent"}>
      <img src={loginBg} alt={loginBg} width={600} />
      <div className="loginStyle">
        <img alt={"logo512"} width={100} src={logo512} />
        <h1>贸易链管理系统</h1>
        <DynamicForm
          saveText={"登录"}
          wrapperCol={{ offset: 0 }}
          onSubmit={onConfirm}
          fields={loginFormParam}
        />
      </div>
    </div>
  );
};
export default Login;
