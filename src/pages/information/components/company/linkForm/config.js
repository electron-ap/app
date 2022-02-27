import Button from "antd/lib/button";

export const formFields = [
  {
    type: "text",
    label: "aaaa",
    name: "teset",
    suffixIcon: () => (
      <div style={{ width: 100 }}>
        <Button data-type={"add"} type={"primary"}>
          Add
        </Button>
      </div>
    ),
    extraProps: {
      style: {
        width: 320,
      },
    },
  },
];

export const itemImpl = (id) => ({
  type: "select",
  label: "addItem",
  name: id,
  suffixIcon: (
    <Button data-id={id} data-type={"reduce"} type={"primary"}>
      Reduce
    </Button>
  ),
  extraProps: {
    options: [
      {
        label: "123",
        value: 213,
      },
    ],
    style: {
      width: 320,
    },
  },
});
