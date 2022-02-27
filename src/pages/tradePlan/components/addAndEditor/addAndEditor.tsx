import {
  companyProduct,
  fetchCompany,
  invoiceTypes,
} from "libs/api/trade-plan";

import { useEffect, useState } from "react";
import CommonForm from "./form";
import { addPlan } from "libs/api/trade-plan";
import { submitType } from "libs/types/formField";
import "./index.scss";

export type dataOptonsType = {
  companyOptions: Array<any>;
  invoicePlateOptions: Array<any>;
  productOptions: Array<any>;
} | null;

const AddAndEditor = ({
  initialValues = {},
  submitImpl,
}: {
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

  return (
    <div id={"tradePlanContainer"} style={{ width: 1000, margin: "0 auto" }}>
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
