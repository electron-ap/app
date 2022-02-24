import DynamicForm from "components/form";
// import {
//   addPlan,
// } from "libs/api/trade-plan";
import { submitType } from "libs/types/formField";
import {
  companyFieldsImpl,
  productFieldImpl,
  productsHeaderImpl,
} from "pages/tradePlan/config/add";
import { useEffect, useState, useRef, useCallback, memo } from "react";
import { dataOptonsType } from ".";

const AddForm = ({ dataOptions }: { dataOptions: dataOptonsType }) => {
  const container = useRef<Element | null>(null);
  const [productForm, setProductForm] = useState<Array<any>>([]);
  const [companyForm, setCompanyForm] = useState<Array<any>>([]);

  console.log(productForm, companyForm);
  useEffect(() => {
    // 公司配置项
    const initCompany = () => {
      const { companyOptions, invoicePlateOptions } = dataOptions as any;
      const fetchCompanyForm = companyFieldsImpl(
        companyOptions,
        invoicePlateOptions
      );
      setCompanyForm(fetchCompanyForm);
    };

    initCompany();
    initProduct();
  }, [dataOptions]);

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

  const tradeClickImplement = (e: any) => {
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
  };

  // 产品配置项
  const initProduct = useCallback(
    (id: string = "0") => {
      const { productOptions } = dataOptions as any;
      const productFormConfig = productFieldImpl(id, productOptions);
      const fetchProductForm = productsHeaderImpl(id, productFormConfig);
      setProductForm((prev) => prev.concat(fetchProductForm));
    },
    [setProductForm]
  );

  const reduce = (id: string) => {
    const arr = productForm.filter((item) => item.name !== id);
    setProductForm(arr);
  };

  const onSubmit = (...args: submitType) => {
    const [value, suc] = args;
    const { ticket, ...reset } = value;
    const restParams = computedValue(reset);
    console.log(restParams);
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
    initProduct(id);
  };

  return (
    <>
      <h1 style={{ fontSize: 16 }}>贸易计划：发票</h1>
      <DynamicForm
        onSubmit={onSubmit}
        saveText={"保存"}
        fields={[...companyForm, ...productForm]}
        layout={"vertical"}
      />
    </>
  );
};

export default memo(AddForm);
