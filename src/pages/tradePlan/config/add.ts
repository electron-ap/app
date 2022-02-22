import { FormLayout } from "antd/lib/form/Form";
import { FieldType } from "libs/types/formField";

const extralFormConfig = [
  {
    label: "资料提交截止日",
    name: "stopTime",
    rules: [{ required: true, message: "请选择" }],
    type: "date",
  },
  {
    label: "办理所需时间",
    name: "needTime",
    rules: [{ required: true, message: "请输入" }],
    type: "text",
  },
];

const left = {
  display: "inline-block",
  width: "30%",
};

const right = {
  display: "inline-block",
  width: "30%",
  marginLeft: "20%",
};

export const productsConfig = [
  {
    style: left,
    label: "产品种类",
    name: "productId",
    type: "select",
    rules: [{ required: true, message: "请输入" }],
    extraProps: {
      optionsName: "name",
      optionsKey: "id",
      options: [],
    },
  },
  {
    style: right,
    label: "预计利润",
    name: "profit",
    type: "number",
  },
  {
    style: left,
    label: "毛利率",
    name: "grossMargin",
    type: "number",
  },
  {
    style: right,
    label: "备注",
    name: "remark",
    type: "textarea",
  },
];

export const fieldsForm: Array<FieldType> = [
  {
    style: left,
    label: "公司名称",
    name: "companyID",
    rules: [{ required: true, message: "请选择" }],
    type: "select",
    extraProps: {
      optionsName: "name",
      optionsKey: "id",
    },
  },
  {
    style: right,
    label: "发票总金额",
    name: "invoiceTotal",
    type: "text",
    rules: [{ required: true, message: "请输入" }],
  },
  {
    style: left,
    label: "发票版型",
    name: "invoicePlateType",
    rules: [{ required: true, message: "请选择" }],
    type: "select",
    extraProps: {
      optionsName: "name",
      optionsKey: "id",
    },
  },
  {
    style: right,
    label: "可使用发票总金额",
    name: "invoiceUsable",
    type: "text",
    rules: [{ required: true, message: "请输入" }],
  },
  {
    style: left,
    label: "单月固定票量",
    name: "ticketQuantity",
    rules: [{ required: true, message: "请选择" }],
    type: "text",
    extraProps: {
      suffix: "张",
    },
  },
  {
    style: right,
    label: "计划月份",
    name: "planMonth",
    rules: [{ required: true, message: "请选择" }],
    type: "date",
    extraProps: {
      picker: "month",
    },
  },
  {
    style: left,
    label: "上月发票结余",
    name: "invoiceBalance",
    type: "text",
    rules: [{ required: true, message: "请输入" }],
  },
  // {
  //     name: "上月发票结余xxxxxx",
  //     // noStyle: true,
  //     calIsVisible: (getFieldsValue) => !getFieldsValue(["complex", "isVisible"]),
  //     type: "complex",
  //     extraProps: {
  //         innerForm: extralFormConfig,
  //     },
  // },
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
