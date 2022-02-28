import Button from "antd/lib/button";
import { useParamsContext } from "libs/context/paramsProvider";
import { operate } from "pages/tradePlan/config/stateOperate";
import { useState } from "react";
import "./actived.scss";
const TradePlanStateOperation = () => {
  const [actived, setActived] = useState<number>(0);
  const { setParams, params } = useParamsContext();
  const checkoutImpl = (code: number) => {
    setActived(code);
    setParams({
      ...params,
      state: code,
    });
  };
  return (
    <div style={{ marginBottom: 15 }}>
      {operate.map(({ code, name, ...props }) => (
        <Button
          className={code === actived ? "actived" : "normal"}
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
