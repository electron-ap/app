import DynamicForm from "components/form";
import { submitType } from "libs/types/formField";
import {
  companyFieldsImpl,
  productFieldImpl,
  transformSubmitDataConfig,
} from "pages/tradePlan/config/add";
import { useEffect, useState, memo } from "react";
import omit from "lodash/omit";
import values from "lodash/values";
import { MinusButton, TitleAndButton } from "./addButton";
import { dataOptonsType } from "./addAndEditor";

const Form = ({
  dataOptions,
  initialValues = {},
  submitImpl,
}: {
  dataOptions: dataOptonsType;
  initialValues: any;
  submitImpl: (...args: submitType) => void;
}) => {
  const [productForm, setProductForm] = useState<Array<any>>([]);
  const [companyForm, setCompanyForm] = useState<Array<any>>([]);
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

    // 初始化产品表单
    const resetParams = omit(initialValues, "ticket");
    const length = values(resetParams).length || 1;
    for (let i = 0; length > i; ++i) {
      initProduct(i + "");
    }
  }, [dataOptions]);

  const productsHeaderImpl = (id: string = "0", innerForm: Array<any>) => [
    {
      name: id, // 默认选项
      noStyle: true,
      prefixIcon:
        id === "0" ? (
          <TitleAndButton add={add} />
        ) : (
          <MinusButton id={id} reduce={reduce} />
        ),
      type: "complex",
      extraProps: {
        innerForm,
      },
    },
  ];

  // 产品配置项
  const initProduct = (id: string = "0") => {
    const { productOptions } = dataOptions as any;
    const productFormConfig = productFieldImpl(id, productOptions);
    const fetchProductForm = productsHeaderImpl(id, productFormConfig);
    setProductForm((prev) => prev.concat(fetchProductForm));
  };

  const reduce = (id: string) => {
    setProductForm((prev) => prev.filter((item) => item.name !== id));
  };

  const onSubmit = async (...args: submitType) => {
    const [value, suc, err] = args;
    const { ticket, ...reset } = value;
    const companyName = fetchCompanyName(ticket, dataOptions);
    const restParams = computedValue(reset);
    submitImpl(
      {
        products: restParams,
        ticket: {
          ...ticket,
          companyName,
        },
        state: 0,
      },
      suc,
      err
    );
  };

  const fetchCompanyName = (
    ticket: { [v: string]: unknown },
    dataOptions: dataOptonsType
  ) => {
    const { companyId } = ticket;
    const { companyOptions } = dataOptions as any;
    return companyOptions.find(
      ({ id }: { id: number | string }) => id === companyId
    ).name;
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
        initialValues={initialValues}
        transformSubmitDataConfig={transformSubmitDataConfig}
        onSubmit={onSubmit}
        saveText={"保存"}
        fields={[...companyForm, ...productForm]}
        layout={"vertical"}
      />
    </>
  );
};

export default memo(Form);
