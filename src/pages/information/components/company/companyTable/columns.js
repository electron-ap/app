import { Tag } from "antd";
import ActionsJsx from "../../../../../components/actions";

const actions = [
  {
    code: "linkCompany",
    type: "primary",
    name: "关联公司",
  },
  {
    code: "linkTag",
    type: "primary",
    name: "关联tag",
    style: {
      margin: "0 10px",
    },
  },
];

export const columns = [
  {
    title: "公司编码",
    dataIndex: "orderNumber",
    width: 80,
    render: (text, data, ind) => ind + 1,
  },
  {
    title: "公司名称",
    width: 200,
    dataIndex: "name",
    key: "name",
  },
  {
    title: "简称",
    width: 200,
    dataIndex: "abbreviation",
    key: "abbreviation",
  },
  {
    title: "英文缩写",
    width: 200,
    dataIndex: "company_code",
    key: "company_code",
  },
  {
    title: "公司类型",
    width: 200,
    dataIndex: "categoryName",
    key: "categoryName",
  },
  {
    title: "关联公司",
    width: 200,
    dataIndex: "companyrelateds",
    key: "companyrelateds",
    render: (text) => {
      return text?.map((item, index) => {
        return (
          <Tag key={index} color="magenta">
            {item.name}
          </Tag>
        );
      });
    },
  },
  {
    title: "所属tag",
    width: 200,
    dataIndex: "tags",
    key: "tags",
    render: (arr) => {
      return arr?.map((item) => {
        return <Tag key={item.tagId}>{item.tagName}</Tag>;
      });
    },
  },
  {
    title: "操作",
    width: 230,
    dataIndex: "action",
    key: "action",
    fixed: "right",
    render: (text, record) => <ActionsJsx record={record} actions={actions} />,
  },
];
