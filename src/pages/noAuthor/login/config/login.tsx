import { FieldType } from "libs/types/formField";
import user from "assets/static/zhanghao.png";
import password from "assets/static/mima.png";
import Button from "antd/lib/button";

const fieldsForm: Array<FieldType> = [
  {
    name: "mobile",
    type: "text",
    label: "",
    rules: [{ required: true, message: "请输入手机号" }],
    extraProps: {
      prefix: <img alt={"user"} src={user} width={20} />,
      placeholder: "手机号",
      style: {
        height: 40,
      },
    },
  },
  {
    name: "password",
    type: "text",
    label: "",
    rules: [{ required: true, message: "请输入登陆密码" }],
    extraProps: {
      prefix: <img alt={"password"} src={password} width={20} />,
      placeholder: "请输入登陆密码",
      style: {
        height: 40,
      },
      type: "password",
    },
  },
];

export default fieldsForm;
