import { ButtonType } from "antd/lib/button";

import {
  DownloadOutlined,
  PlusCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export const operate = [
  {
    code: "add",
    name: "新增计划",
    icon: <PlusCircleOutlined />,
    type: "primary" as ButtonType,
  },
  {
    code: "upload",
    name: "上传计划",
    icon: <UploadOutlined />,
    style: {
      margin: "0 10px",
    },
  },
  {
    code: "download",
    name: "下载计划",
    icon: <DownloadOutlined />,
  },
  {
    code: "batchDelete",
    name: "批量删除",
    icon: <DeleteOutlined />,
    type: "danger" as ButtonType,
    style: {
      margin: "0 10px",
    },
  },
];
