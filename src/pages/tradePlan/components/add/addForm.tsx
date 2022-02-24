import DynamicForm from "components/form";
import {
  addPlan,
  companyProduct,
  fetchCompany,
  invoiceTypes,
} from "libs/api/trade-plan";
import { submitType } from "libs/types/formField";
import {
  productsConfigHeader,
  appendProductsImpl,
  productMain,
} from "pages/tradePlan/config/add";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import Button from "antd/lib/button";
import { Fragment, useEffect, useState } from "react";
import { useRef, useCallback } from "react";

const AddForm = ({ companyForm }: { companyForm: Array<any> }) => {
  const container = useRef<Element | null>(null);
  // // const [fieldsInitialValue, setFields] = useState<Array<any>>([]);
  // // 获取产品options的产品配置
  // const [computdProduct, setProduct] = useState<Array<any>>([]);
  // // // 获取带头的产品配置
  const [defaultProduct, setProductConfig] = useState<Array<any>>([]);
  // //
  // // // 获取带头的产品配置
  const [appendConfig, setAppendConfig] = useState<Array<any>>([]);

  useEffect(() => {
    productsConfigHeader[0].extraProps = {
      innerForm: productMain(),
    } as any;
    setProductConfig([...productsConfigHeader]);
  }, [companyForm]);

  useEffect(() => {
    container.current = document.querySelector("#tradePlanContainer");
    container.current?.addEventListener("click", tradeClickImplement, false);

    return () =>
      container.current?.removeEventListener(
        "click",
        tradeClickImplement,
        false
      );
  });

  const tradeClickImplement = useCallback(
    (e: any) => {
      const button = e.target.closest("button");
      if (!button) return;
      const action = button.dataset.action;
      const id = button.dataset.id;
      if (!action) return;
      switch (action) {
        case "add":
          add();
          break;
        case "reduce":
          reduce(id);
          break;
        default:
          break;
      }
    },
    [appendConfig]
  );

  const reduce = (id: string) => {
    const arr = appendConfig.filter((item) => item.name !== id);
    setAppendConfig(arr);
  };
  const onSubmit = (...args: submitType) => {
    const [value, suc, error] = args;
    const { ticket, ...reset } = value;
    console.log(value);
    const restParams = computedValue(reset);
    // addPlan({
    //     products: restParams,
    //     ticket,
    //     state: 0,
    //
    // })
    suc();
  };

  const computedValue = (value: { [v: string]: unknown }) => {
    let arr = [];
    for (let i in value) {
      arr.push(value[i]);
    }
    return arr;
  };

  const add = () => {
    const id = new Date().valueOf() + "";
    const config = appendProductsImpl(id);
    config[0].extraProps = {
      innerForm: productMain(id),
    } as any;
    setAppendConfig((prev) => prev.concat(config));
  };

  return (
    <>
      <h1 style={{ fontSize: 16 }}>贸易计划：发票</h1>
      <DynamicForm
        onSubmit={onSubmit}
        saveText={"保存"}
        fields={[...companyForm, ...defaultProduct, ...appendConfig]}
        layout={"vertical"}
      />
    </>
  );
};

export default AddForm;
