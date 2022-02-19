import React, { FC } from "react";
import { loginFormParam, resetPasswordForm } from "./config";
import DynamicForm from "components/form";
import { useAuth } from "libs/context/authorityProvider";
import { useBackground } from "libs/hooks";
import "pages/noAuthor/login/loginStyle/index.less";
import logo from "assets/static/logo.png";
import DialogJsx from "components/dialog";
import ResetPassWordJsx from "../resetPassword";

const Login: FC = () => {
  const { loginImplement, isShow, setShowModel } = useAuth();
  const onConfirm = (...args: Parameters<typeof loginImplement>) =>
    loginImplement(...args);

  useBackground("#fff");

  return (
    <div className={"loginComponent"}>
      <div className="loginStyle">
        <img alt={"logo"} width={160} src={logo} />
        <h1>诊断医师平台</h1>
        <DynamicForm
          saveText={"登录"}
          wrapperCol={{ span: 24, offset: 0 }}
          onSubmit={onConfirm}
          fields={loginFormParam}
        />
        <DialogJsx
          resetProps={{
            title: "忘记密码",
            visible: isShow,
            onCancel: () => setShowModel(false),
          }}
        >
          <ResetPassWordJsx fields={resetPasswordForm} />
        </DialogJsx>
      </div>
    </div>
  );
};
export default Login;
