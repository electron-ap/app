import { FormInstance } from "antd";
import dayjs from "dayjs";
import { NamePath, TransformType } from "libs/types/formField";
import { values, isEmpty } from "lodash";
import { TitleAndButton, MinusButton } from "../components/add/addButton";

const nzhcn = require("nzh/cn");

// const extralFormConfig = [

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
    suffixIcon: ({ getFieldValue }: FormInstance) => {
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
    suffixIcon: ({ getFieldValue }: FormInstance) => {
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

// 计算是否显示
const calIsVisible = ({ getFieldsValue }: FormInstance) => {
  let { ticket, ...rest } = getFieldsValue();
  let value = 0;
  if (isEmpty(rest)) return false;
  values(rest).forEach((item: any) => {
    if (!isEmpty(item)) {
      value += item.tradeAmountTotal || 0;
    }
  });
  return ticket.invoiceTotal < value;
};

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
    suffixIcon: ({ getFieldValue }: FormInstance) => {
      const value = getFieldValue(["ticket", "invoiceTotal"]) as any;
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
    suffixIcon: ({ getFieldValue }: FormInstance) => {
      const value = getFieldValue(["ticket", "invoiceUsable"]) as any;
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
    suffixIcon: ({ getFieldValue }: FormInstance) => {
      const value = getFieldValue(["ticket", "ticketQuantity"]) as any;
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
    label: "资料提交截止日",
    name: ["ticket", "stopTime"],
    calIsVisible,
    rules: [{ required: true, message: "请选择" }],
    type: "date",
    extraProps: {
      style: {
        width: "100%",
      },
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
    label: "增版增量",
    name: ["ticket", "editionIncr"],
    calIsVisible,
    rules: [{ required: true, message: "请选择" }],
    type: "radioGroup",
    extraProps: {
      options: [
        {
          value: 1,
          label: "增版",
        },
        {
          value: 2,
          label: "增量",
        },
      ],
    },
  },
  {
    style: normal,
    label: "上月发票结余",
    name: ["ticket", "invoiceBalance"],
    type: "number",
    rules: [{ required: true, message: "请输入" }],
    suffixIcon: ({ getFieldValue }: FormInstance) => {
      const value = getFieldValue(["ticket", "invoiceBalance"]) as any;
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
    calIsVisible,
    style: normalAndPadding,
    label: "办理所需时间",
    name: ["ticket", "needTime"],
    rules: [{ required: true, message: "请输入" }],
    type: "number",
    extraProps: {
      style: {
        width: "100%",
      },
      addonAfter: "工作日",
    },
  },
  {
    calIsVisible,
    style: normalAndPadding,
    label: "所需资料",
    name: ["ticket", "materials"],
    type: "text",
    rules: [{ required: true, message: "请输入" }],
  },
  {
    calIsVisible,
    style: normalAndPadding,
    label: "其他",
    name: ["ticket", "orther"],
    type: "textarea",
  },
];

export const transformSubmitDataConfig: Array<TransformType> = [
  {
    from: "ticket.planMonth",
    to: "ticket.planMonth",
    format: (value: Date) => dayjs(value).format("YYYY-MM"),
  },
  {
    from: "ticket.stopTime",
    to: "ticket.stopTime",
    format: (value: Date) => dayjs(value).format("YYYY-MM-DD"),
  },
];
