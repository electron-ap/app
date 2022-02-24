import { NamePath } from "libs/types/formField";
import { TitleAndButton, MinusButton } from "../components/add/addButton";

const nzhcn = require("nzh/cn");

// const extralFormConfig = [
//   {
//     label: "资料提交截止日",
//     name: "stopTime",
//     rules: [{ required: true, message: "请选择" }],
//     type: "date",
//   },
//   {
//     label: "办理所需时间",
//     name: "needTime",
//     rules: [{ required: true, message: "请输入" }],
//     type: "text",
//   },
// ];

const normalAndAndTop = {
  width: "30%",
  marginTop: -60,
};
const normalAndPadding = {
  width: "30%",
  marginRight: "20%",
};

const normal = {
  width: "30%",
};

// id = 0 为默认值
export const productFieldImpl = (
  id: string = "0",
  productOptions: Array<any> = []
) => [
  {
    style: normalAndPadding,
    label: "产品种类",
    name: [id, "productId"],
    type: "select",
    rules: [{ required: true, message: "请输入" }],
    extraProps: {
      optionsName: "name",
      optionsKey: "id",
      options: productOptions,
    },
  },
  {
    style: normal,
    label: "预计利润",
    name: [id, "profit"],
    type: "number",
    suffixIcon: (getFieldValue: (e: NamePath) => void) => {
      const value = getFieldValue([id, "profit"]) as any;
      return (
        <span
          style={{
            top: 35,
            width: "20%",
            left: 5,
            position: "relative",
            color: "#1890ff",
          }}
        >
          {nzhcn.encodeB((value || 0) + "")}元
        </span>
      );
    },
    extraProps: {
      addonAfter: "元",
      style: {
        width: "100%",
      },
      formatter: (value: any) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      parser: (value: any) => value.replace(/\$\s?|(,*)/g, ""),
    },
  },
  {
    style: normal,
    label: "预计贸易总金额",
    name: [id, "tradeAmountTotal"],
    type: "number",
    rules: [{ required: true, message: "请输入" }],
    suffixIcon: (getFieldValue: (e: NamePath) => void) => {
      const value = getFieldValue([id, "tradeAmountTotal"]) as any;
      return (
        <span
          style={{
            top: 35,
            width: "20%",
            left: 5,
            position: "relative",
            color: "#1890ff",
          }}
        >
          {nzhcn.encodeB((value || 0) + "")}元
        </span>
      );
    },
    extraProps: {
      addonAfter: "元",
      style: {
        width: "100%",
      },
      formatter: (value: any) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      parser: (value: any) => value.replace(/\$\s?|(,*)/g, ""),
    },
  },
  {
    style: normalAndPadding,
    label: "备注",
    name: [id, "remark"],
    type: "textarea",
    extraProps: {
      style: {
        height: 100,
      },
    },
  },
  {
    style: normalAndAndTop,
    label: "毛利率",
    name: [id, "grossMargin"],
    type: "number",
    rules: [{ required: true, message: "请输入" }],
    extraProps: {
      addonAfter: "%",
      style: {
        width: "100%",
      },
    },
  },
];

export const productsHeaderImpl = (id: string = "0", innerForm: Array<any>) => [
  {
    name: id, // 默认选项
    noStyle: true,
    prefixIcon: () =>
      id === "0" ? <TitleAndButton /> : <MinusButton id={id} />,
    type: "complex",
    extraProps: {
      innerForm,
    },
  },
];

export const companyFieldsImpl = (
  companyOptions: Array<any> = [],
  invoicePlateTypeOptions: Array<any> = []
) => [
  {
    style: normalAndPadding,
    label: "公司名称",
    name: ["ticket", "companyID"],
    rules: [{ required: true, message: "请选择" }],
    type: "select",
    extraProps: {
      optionsName: "name",
      optionsKey: "id",
      options: companyOptions,
    },
  },
  {
    style: normal,
    label: "发票总金额",
    name: ["ticket", "invoiceTotal"],
    type: "number",
    rules: [{ required: true, message: "请输入" }],
    suffixIcon: (getFieldValue: (e: NamePath) => void) => {
      const value = getFieldValue("invoiceTotal") as any;
      return (
        <span
          style={{
            top: 35,
            width: "20%",
            left: 5,
            position: "relative",
            color: "#1890ff",
          }}
        >
          {nzhcn.encodeB((value || 0) + "")}元
        </span>
      );
    },
    extraProps: {
      addonAfter: "元",
      style: {
        width: "100%",
      },
      formatter: (value: any) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      parser: (value: any) => value.replace(/\$\s?|(,*)/g, ""),
    },
  },
  {
    style: normalAndPadding,
    label: "发票版型",
    name: ["ticket", "invoicePlateType"],
    rules: [{ required: true, message: "请选择" }],
    type: "select",
    extraProps: {
      optionsName: "name",
      optionsKey: "id",
      options: invoicePlateTypeOptions,
    },
  },
  {
    style: normal,
    label: "可使用发票总金额",
    name: ["ticket", "invoiceUsable"],
    type: "number",
    rules: [{ required: true, message: "请输入" }],
    suffixIcon: (getFieldValue: (e: string) => void) => {
      const value = getFieldValue("invoiceUsable") as any;
      return (
        <span
          style={{
            top: 35,
            width: "20%",
            left: 5,
            position: "relative",
            color: "#1890ff",
          }}
        >
          {nzhcn.encodeB((value || 0) + "")}元
        </span>
      );
    },
    extraProps: {
      addonAfter: "元",
      style: {
        width: "100%",
      },
      formatter: (value: any) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      parser: (value: any) => value.replace(/\$\s?|(,*)/g, ""),
    },
  },
  {
    style: normal,
    label: "单月固定票量",
    name: ["ticket", "ticketQuantity"],
    type: "number",
    rules: [{ required: true, message: "请输入" }],
    suffixIcon: (getFieldValue: (e: string) => void) => {
      const value = getFieldValue("ticketQuantity") as any;
      return (
        <span
          style={{
            top: 35,
            width: "20%",
            left: 5,
            position: "relative",
            color: "#1890ff",
          }}
        >
          {nzhcn.encodeB((value || 0) + "")}张
        </span>
      );
    },
    extraProps: {
      addonAfter: "张",
      style: {
        width: "100%",
      },
      formatter: (value: any) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      parser: (value: any) => value.replace(/\$\s?|(,*)/g, ""),
    },
  },
  {
    style: normalAndPadding,
    label: "计划月份",
    name: ["ticket", "planMonth"],
    type: "date",
    extraProps: {
      picker: "month",
      style: {
        width: "100%",
      },
    },
  },
  {
    style: normal,
    label: "上月发票结余",
    name: ["ticket", "invoiceBalance"],
    type: "number",
    rules: [{ required: true, message: "请输入" }],
    suffixIcon: (getFieldValue: (e: string) => void) => {
      const value = getFieldValue("invoiceBalance") as any;
      return (
        <span
          style={{
            top: 35,
            width: "20%",
            left: 5,
            position: "relative",
            color: "#1890ff",
          }}
        >
          {nzhcn.encodeB((value || 0) + "")}元
        </span>
      );
    },
    extraProps: {
      addonAfter: "元",
      style: {
        width: "100%",
      },
      formatter: (value: any) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      parser: (value: any) => value.replace(/\$\s?|(,*)/g, ""),
    },
  },
  // {
  //     label: "增版增量",
  //     name: "editionIncr",
  //     rules: [{ required: true, message: "请选择" }],
  //     type: "checkboxGroup",
  //     extraProps: {
  //         options: [
  //             {
  //                 value: 1,
  //                 label: '增版'
  //             },
  //             {
  //                 value: 2,
  //                 label: '增量'
  //             }
  //         ]
  //     }
  // },
  // {
  //     name: "",
  //     noStyle: true,
  //     calIsVisible: (getFieldsValue) => !getFieldsValue(["complex", "isVisible"]),
  //     type: "complex",
  //     extraProps: {
  //         innerForm: extralFormConfig,
  //     },
  // },
  // {
  //     label: "所需资料",
  //     name: "materials",
  //     type: "text",
  //     rules: [{ required: true, message: "请输入" }],
  // },
  // {
  //     label: "其他",
  //     name: "orther",
  //     type: "text",
  // },
];
