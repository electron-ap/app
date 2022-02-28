import Button from "antd/lib/button";

export const formFields = [
  {
    type: "text",
    label: "公司名称",
    name: "CName",
    suffixIcon: () => (
      <div style={{ width: 80, textAlign: "right" }}>
        <Button data-type={"add"} type={"primary"}>
          新增
        </Button>
      </div>
    ),
    extraProps: {
      disabled: true,
      style: {
        width: 320,
      },
    },
  },
];

export const itemImpl = (title, id, options, init = "") => ({
  type: "select",
  label: title,
  name: id,
  value: init,
  suffixIcon: (
    <Button data-id={id} data-type={"reduce"} type="primary" danger>
      删除
    </Button>
  ),
  extraProps: {
    options,
    optionsKey: "id",
    optionsName: "name",
    style: {
      width: 320,
    },
  },
  rules: [
    {
      required: true,
      message: `请选择${title}`,
    },
  ],
});
