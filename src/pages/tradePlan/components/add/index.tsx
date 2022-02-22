import DynamicForm from "components/form";
import {
  companyProduct,
  fetchCompany,
  invoiceTypes,
} from "libs/api/trade-plan";
import { submitType } from "libs/types/formField";
import { fieldsForm, productsConfig } from "pages/tradePlan/config/add";
import { PlusCircleOutlined } from "@ant-design/icons";
import Button from "antd/lib/button";
import { useEffect, useState } from "react";
import AddProductList from "./addProduct";

const TradePlanAdd = () => {
  const [fieldsInitialValue, setFields] = useState<Array<any>>([]);
  const [productsForm, setProducts] = useState<Array<any>>([]);
  const [lists, setLists] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const datas = await Promise.all([
          fetchCompany(),
          invoiceTypes(),
          companyProduct(),
        ]);
        const dataOptions: any = {
          companyID: {
            optionsName: "name",
            optionsKey: "id",
            options: datas[0].list,
          },
          invoicePlateType: {
            optionsName: "name",
            optionsKey: "id",
            options: datas[1].list,
          },
          productId: {
            optionsName: "name",
            optionsKey: "id",
            options: datas[2].list,
          },
        };

        productsConfig[0].extraProps = {
          ...productsConfig[0].extraProps,
          ...dataOptions.productId,
        };

        const arr = fieldsForm.map((item: any) => {
          const key = item.name.toString();
          if (dataOptions.hasOwnProperty(key)) {
            item.extraProps = {
              ...item.extraProps,
              ...dataOptions[key],
            };
          }
          return item;
        });

        setProducts([...productsConfig]);
        setFields(arr);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const onSubmit = (...args: submitType) => {};

  return (
    <>
      <h1 style={{ fontSize: 16 }}>贸易计划：发票</h1>
      <DynamicForm
        onSubmit={onSubmit}
        saveText={"保存"}
        fields={fieldsInitialValue}
        layout={"vertical"}
      />
      <h1 style={{ fontSize: 16 }}>贸易计划：产品</h1>
      <div>
        <Button icon={<PlusCircleOutlined />} />
        <AddProductList fields={productsForm} layout={"vertical"} />
        {/*<DynamicForm*/}
        {/*    onSubmit={onSubmit}*/}
        {/*    saveText={"产品"}*/}
        {/*    fields={productsForm}*/}
        {/*    */}
        {/*/>*/}
      </div>
    </>
  );
};

export default TradePlanAdd;
