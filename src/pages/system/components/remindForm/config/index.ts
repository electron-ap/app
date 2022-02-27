import { FieldType, NamePath } from "libs/types/formField";
import { FormInstance } from "antd";

const formFields: Array<FieldType> = [
  {
    name: ["a"],
    label: "排期异常通知时间",
    type: "radioGroup",
    rules: [
      ({ getFieldsValue, setFieldsValue }: FormInstance) => ({
        validator(_: unknown, value: Array<number>) {
          const { a } = getFieldsValue();
          if (a === "2") {
            setFieldsValue({
              start: "",
            });
          } else {
            setFieldsValue({
              end: "",
            });
          }
          return Promise.resolve();
        },
      }),
    ],
    extraProps: {
      // style: {
      //     background: '#f00',
      //     height: 30,
      //     lineHeight: '30px',
      // },
      options: [
        {
          label: "1说明大小",
          value: "1",
          suffix: [
            {
              calIsDisabled: ({ getFieldValue }: FormInstance) =>
                getFieldValue("a") === "2",
              name: "start",
              type: "number",
              style: {
                background: "blue",
                marginBottom: 0,
              },
              rules: [
                ({ getFieldValue }: FormInstance) => ({
                  required: getFieldValue("a") === "1",
                  message: "请输入名称3",
                }),
              ],
            },
          ],
        },
        {
          label: "2说明大小",
          value: "2",

          suffix: [
            {
              calIsDisabled: ({ getFieldValue }: FormInstance) =>
                getFieldValue("a") === "1",
              name: "end",
              type: "number",
              style: {
                background: "blue",
                marginBottom: 0,
              },
              rules: [
                ({ getFieldValue }: FormInstance) => {
                  return {
                    required: getFieldValue("a") === "2",
                    message: "请输入名称3",
                  };
                },
              ],
            },
          ],
        },
      ],
    },
  },
];

export default formFields;
