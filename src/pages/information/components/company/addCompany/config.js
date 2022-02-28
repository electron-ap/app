const fieldsForm = [
  {
    label: "公司编码",
    name: "a",
    type: "search",
    extraProps: {
      style: {
        width: 400,
      },
      placeholder: "请输入公司编码",
      enterButton: true,
      onSearch: () => {
        console.log(123);
      },
    },
    rules: [
      {
        required: true,
        message: "请输入公司编码",
      },
      {
        validator: (a) => {
          console.log(a);
          return false;
        },
      },
    ],
  },
  {
    label: "公司名称",
    name: "b",
    type: "search",
    extraProps: {
      style: {
        width: 400,
      },
      placeholder: "请输入公司名称",
      enterButton: true,
    },
    rules: [
      {
        required: true,
        message: "请输入公司名称",
      },
    ],
  },
  {
    label: "简称",
    name: "c",
    type: "text",
    extraProps: {
      style: {
        width: 400,
      },
      placeholder: "请输入公司简称",
    },
  },
  {
    label: "英文缩写",
    name: "c",
    type: "text",
    extraProps: {
      style: {
        width: 400,
      },
      placeholder: "请输入英文缩写",
    },
  },
  {
    label: "公司类型",
    name: "c",
    type: "select",
    extraProps: {
      style: {
        width: 400,
      },
      placeholder: "请输入英文缩写",
      options: [
        {
          label: "a",
          value: "123",
        },
      ],
    },
  },
  {
    label: "备注",
    name: "c",
    type: "textarea",
    extraProps: {
      style: {
        width: 400,
        height: 100,
      },
      // autoSize: true
    },
  },
];

const config = {
  saveText: "保存",
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
  fields: fieldsForm,
};

export default config;
