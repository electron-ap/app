const fieldsForm = [
  {
    label: "",
    name: "searchContext",
    type: "text",
    extraProps: {
      style: {
        width: 200,
      },
      placeholder: "请输入搜索内容",
    },
  },
];

const config = {
  layout: "inline",
  saveText: "查询",
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
  fields: fieldsForm,
};

export default config;
