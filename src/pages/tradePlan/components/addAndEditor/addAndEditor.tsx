import {
  companyProduct,
  fetchCompany,
  invoiceTypes,
} from "libs/api/trade-plan";

import { useEffect, useState } from "react";
import CommonForm from "./form";
import { submitType } from "libs/types/formField";
import "./index.scss";

export type dataOptonsType = {
  companyOptions: Array<any>;
  invoicePlateOptions: Array<any>;
  productOptions: Array<any>;
} | null;

const AddAndEditor = ({
  title,
  initialValues = {},
  submitImpl,
}: {
  title: string;
  initialValues?: { [v: string]: unknown };
  submitImpl: (...args: submitType) => void;
}) => {
  // 获取公司 / 产品options的产品配置
  const [dataOptions, setOptions] = useState<dataOptonsType>(null);

  useEffect(() => {
    (async () => {
      try {
        const datas = await Promise.all([
          fetchCompany(),
          invoiceTypes(),
          companyProduct(),
        ]);

        const data = {
          companyOptions: datas[0].list,
          invoicePlateOptions: datas[1].list,
          productOptions: datas[2].list,
        };

        setOptions(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // const submitHandler = () => {
  //   const event = document.createEvent('HTMLEvents');
  //   event.initEvent('submit', true, true);
  //   const elem = document.querySelector('#tradePlanContainer button[type=submit]')
  //   console.log(elem)
  //   elem?.dispatchEvent(event);
  // }

  return (
    <div id={"tradePlanContainer"} style={{ width: 1000, margin: "0 auto" }}>
      <section>
        <h1>{title}</h1>
        {/*<Button onClick={submitHandler}>保存</Button>*/}
      </section>
      {dataOptions ? (
        <CommonForm
          submitImpl={submitImpl}
          initialValues={initialValues}
          dataOptions={dataOptions}
        />
      ) : null}
    </div>
  );
};

export default AddAndEditor;
