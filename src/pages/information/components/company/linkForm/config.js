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
      defaultValue: "123",
      style: {
        width: 320,
      },
    },
  },
];

export const itemImpl = (title, id, options) => ({
  type: "select",
  label: title,
  name: id,
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
});
