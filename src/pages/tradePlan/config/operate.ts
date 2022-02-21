import { ButtonType } from "antd/lib/button";
import { DownloadOutlined } from "@ant-design/icons";

export const operate = [
  {
    code: "add",
    name: "新增计划",
    // icon: <DownloadOutlined />,
    type: "primary" as ButtonType,
  },
  {
    code: "upload",
    name: "上传计划",
    style: {
      margin: "0 10px",
    },
  },
  {
    code: "delete",
    name: "下载计划",
  },
  {
    code: "allDelete",
    name: "批量删除",
    type: "danger" as ButtonType,
    style: {
      margin: "0 10px",
    },
  },
];
