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
      <div className={"inner"}>
        <img src={loginBg} alt={loginBg} width={600} />
        <div className="loginStyle">
          <div className={"topInfo"}>
            <img alt={"logo512"} width={80} src={logo512} />
            <h1>贸易链管理系统</h1>
            <p className={"info"}>账号密码登陆</p>
          </div>
          <DynamicForm
            saveText={"登录"}
            onSubmit={onConfirm}
            fields={loginFormParam}
          />
        </div>
      </div>
      <p>copyright©上海国药贸易链管理系统版权所有沪ICP123456</p>
    </div>
  );
};
export default Login;
