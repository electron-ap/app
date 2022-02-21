export const addFormConfig = {
  saveText: "新增",
  fields: [
    {
      label: "账号名称",
      name: "a",
      type: "text",
      extraProps: {
        style: {
          // width: 200,
        },
        placeholder: "请输入账号名称",
      },
      rules: [
        {
          required: true,
          message: "请输入账号名称",
        },
      ],
    },
    {
      label: "所属角色",
      name: "b",
      type: "select",
      extraProps: {
        style: {
          // width: 200,
        },
        options: [
          {
            key: 0,
            value: "管理",
          },
          {
            key: 1,
            value: "经理",
          },
          {
            key: 2,
            value: "员工",
          },
        ],
        placeholder: "请输入电子邮箱",
      },
    },
    {
      label: "电子邮箱",
      name: "c",
      type: "text",
      extraProps: {
        style: {
          // width: 200,
        },
        placeholder: "请输入电子邮箱",
      },
    },
    {
      label: "联系方式",
      name: "d",
      type: "text",
      extraProps: {
        style: {
          // width: 200,
        },
        placeholder: "请输入联系方式",
      },
    },
  ],
};
