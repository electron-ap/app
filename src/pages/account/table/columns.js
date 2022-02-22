import ActionsJsx from "../../../components/actions";

const actions = [
  {
    code: "edit",
    type: "primary",
    name: "编辑",
  },
  {
    code: "delete",
    type: "danger",
    name: "删除",
    style: {
      margin: "0 10px",
    },
  },
];

export const columns = [
  {
    title: "序号",
    dataIndex: "orderNumber",
    width: 80,
    render: (text, data, ind) => ind + 1,
  },
  {
    title: "账号名称",
    width: 160,
    dataIndex: "name",
    key: "name",
  },
  {
    title: "角色",
    width: 160,
    dataIndex: "rolesName",
    key: "rolesName",
  },
  {
    title: "电子邮箱",
    width: 160,
    dataIndex: "email",
    key: "email",
  },
  {
    title: "联系方式",
    width: 160,
    dataIndex: "telephone",
    key: "telephone",
  },
  {
    title: "创建时间",
    width: 160,
    dataIndex: "gmt_create",
    key: "gmt_create",
  },
  {
    fixed: "right",
    title: "操作",
    width: 100,
    dataIndex: "action",
    render: (text, record) => <ActionsJsx record={record} actions={actions} />,
  },
];
