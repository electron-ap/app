import DynamicForm from "components/form";
import {
  companyProduct,
  fetchCompany,
  invoiceTypes,
} from "libs/api/trade-plan";
import { submitType } from "libs/types/formField";
import { fieldsForm } from "pages/tradePlan/config/add";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import Button from "antd/lib/button";
import { Fragment, useEffect, useState } from "react";
import { useRef, useCallback } from "react";
import AddForm from "./addForm";
import "./index.scss";

const TradePlanAdd = () => {
  // 获取公司options的产品配置
  const [companyForm, setCompany] = useState<Array<any>>([]);
  // 获取产品options的产品配置
  const [productForm, setProduct] = useState<Array<any>>([]);

  const dataOptions = useRef<{
    companyID: Array<any>;
    invoicePlateType: Array<any>;
    productId: Array<any>;
  } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const datas = await Promise.all([
          fetchCompany(),
          invoiceTypes(),
          companyProduct(),
        ]);

        dataOptions.current = {
          companyID: datas[0].list,
          invoicePlateType: datas[1].list,
          productId: datas[2].list,
        };

        const arr = fieldsForm.map((item: any) => {
          const key = item.name.toString();
          if (dataOptions.current?.hasOwnProperty(key)) {
            // @ts-ignore
            const value = dataOptions.current[key];
            item.extraProps = {
              ...item.extraProps,
              options: value,
            };
          }
          return item;
        });
        setCompany(arr);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div id={"tradePlanContainer"} style={{ width: 1000, margin: "0 auto" }}>
      <AddForm companyForm={fieldsForm} />
      {/*<AddForm companyForm={fieldsForm} productForm={productMain()}/>*/}
    </div>
  );
};

export default TradePlanAdd;
