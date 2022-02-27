import { BaseButtonProps } from "antd/lib/button/button";

interface buttonType extends BaseButtonProps {
  code: number;
  name: string;
  style?: { [v: string]: unknown };
}

const uploadOperate: Array<buttonType> = [
  {
    code: 1,
    type: "primary",
    name: "保存",
  },
  {
    code: 2,
    name: "下载模版",
    style: {
      margin: "0 10px",
    },
  },
  {
    code: 3,
    name: "导入",
  },
];

export const columns = [
  {
    title: "文件名",
    dataIndex: "orderNumber",
    width: 150,
  },
  {
    title: "上传信息",
    width: 150,
    dataIndex: "companyName",
    key: "companyName",
  },
];

export default uploadOperate;
