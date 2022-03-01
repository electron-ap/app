import Button from "antd/lib/button";
import { useParamsContext } from "libs/context/paramsProvider";
import { operate } from "pages/tradePlan/config/stateOperate";
import { useState } from "react";
import "./actived.scss";
const TradePlanStateOperation = () => {
  const { setParams, params } = useParamsContext();
  const checkoutImpl = (code: number) => {
    setParams({
      ...params,
      state: code,
    });
  };
  return (
    <div style={{ marginBottom: 15 }}>
      {operate.map(({ code, name, ...props }) => (
        <Button
          className={code === params?.state || 0 ? "actived" : "normal"}
          onClick={() => checkoutImpl(code)}
          {...props}
          key={code}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default TradePlanStateOperation;
