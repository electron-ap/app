export const addFormConfig = {
  saveText: "新增",
  fields: [
    {
      label: "账号名称",
      name: "account",
      type: "text",
      extraProps: {
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
      name: "rolesId",
      type: "select",
      extraProps: {
        options: [
          {
            label: "经理",
            value: 1,
          },
          {
            label: "员工",
            value: 2,
          },
        ],
        placeholder: "请选择所属角色",
      },
      rules: [
        {
          required: true,
          message: "请选择所属角色",
        },
      ],
    },
    {
      label: "登录密码",
      name: "password",
      type: "text",
      extraProps: {
        placeholder: "请输入登录密码",
      },
      rules: [
        {
          required: true,
          message: "请输入登录密码",
        },
      ],
    },
    {
      label: "电子邮箱",
      name: "email",
      type: "text",
      extraProps: {
        placeholder: "请输入电子邮箱",
      },
      rules: [
        {
          required: true,
          message: "请输入账号名称",
        },
        {
          type: "email",
          message: "请输入正确的电子邮箱",
        },
      ],
    },
    {
      label: "联系方式",
      name: "telephone",
      type: "text",
      extraProps: {
        placeholder: "请输入联系方式",
      },
      rules: [
        {
          required: true,
          message: "请输入账号名称",
        },
      ],
    },
  ],
};
