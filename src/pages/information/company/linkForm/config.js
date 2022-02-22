import Button from "antd/lib/button";

export const formFields = [
  {
    type: "text",
    label: "aaa",
    suffixIcon: () => {
      return <Button type={"primary"}>新增</Button>;
    },
    extraProps: {},
  },
];
