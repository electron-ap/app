import {
  companyProduct,
  fetchCompany,
  invoiceTypes,
} from "libs/api/trade-plan";
import { useEffect, useState } from "react";
import AddForm from "./addForm";
import "./index.scss";

export type dataOptonsType = {
  companyOptions: Array<any>;
  invoicePlateOptions: Array<any>;
  productOptions: Array<any>;
} | null;

const TradePlanAdd = () => {
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
          // companyOptions: datas[0].list,
          // invoicePlateOptions: datas[1].list,
          // productOptions: datas[2].list,
          companyOptions: [
            {
              name: "公司1",
              id: 1,
            },
          ],
          invoicePlateOptions: [
            {
              name: "万元版",
              id: 1,
            },
          ],
          productOptions: [
            {
              name: "产品1",
              id: 1,
            },
          ],
        };

        setOptions(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div id={"tradePlanContainer"} style={{ width: 1000, margin: "0 auto" }}>
      {dataOptions ? <AddForm dataOptions={dataOptions} /> : null}
    </div>
  );
};

export default TradePlanAdd;
