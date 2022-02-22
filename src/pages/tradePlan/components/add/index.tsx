import DynamicForm from "components/form";
import {
  companyProduct,
  fetchCompany,
  invoiceTypes,
} from "libs/api/trade-plan";
import { submitType } from "libs/types/formField";
import { fieldsForm, productsConfig } from "pages/tradePlan/config/add";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import Button from "antd/lib/button";
import { Fragment, useEffect, useState } from "react";
import AddProductList from "./addProduct";

const TradePlanAdd = () => {
  const [fieldsInitialValue, setFields] = useState<Array<any>>([]);
  const [productsForm, setProducts] = useState<Array<any>>([]);
  const [lists, setLists] = useState<Array<number>>([0]);
  useEffect(() => {
    (async () => {
      try {
        const datas = await Promise.all([
          fetchCompany(),
          invoiceTypes(),
          companyProduct(),
        ]);
        const dataOptions: any = {
          companyID: datas[0].list,
          invoicePlateType: datas[1].list,
          productId: datas[2].list,
        };

        // @ts-ignore
        productsConfig[0].extraProps = {
          ...productsConfig[0].extraProps,
          options: dataOptions.productId,
        };

        const arr = fieldsForm.map((item: any) => {
          const key = item.name.toString();
          if (dataOptions.hasOwnProperty(key)) {
            item.extraProps = {
              ...item.extraProps,
              options: dataOptions[key],
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

  const add = () => {
    setLists((prev: Array<number>) => prev.concat(new Date().valueOf()));
  };

  const remove = (id: number) => {
    setLists((prev: Array<number>) => prev.filter((item) => item !== id));
  };

  return (
    <div style={{ width: 1000, margin: "0 auto" }}>
      <h1 style={{ fontSize: 16 }}>贸易计划：发票</h1>
      <DynamicForm
        onSubmit={onSubmit}
        saveText={"保存"}
        fields={fieldsInitialValue}
        layout={"vertical"}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ fontSize: 16 }}>贸易计划：产品</h1>
        <PlusCircleOutlined
          onClick={add}
          style={{ fontSize: 24, color: "#1890ff" }}
        />
      </div>
      <div>
        {lists.map((item, ind) => (
          <div style={{ position: "relative" }} key={item}>
            <AddProductList fields={productsForm} layout={"vertical"} />
            {ind >= 1 ? (
              <MinusCircleOutlined
                onClick={remove.bind(null, item)}
                style={{
                  position: "absolute",
                  top: "30%",
                  right: 20,
                  fontSize: 24,
                  color: "red",
                }}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradePlanAdd;
