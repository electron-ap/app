import Button from "antd/lib/button";
import { useParamsContext } from "libs/context/paramsProvider";
import { operate } from "pages/tradePlan/config/stateOperate";

const TradePlanStateOperation = () => {
  const { setParams, params } = useParamsContext();
  const checkoutImpl = (code: string) => {
    setParams({
      ...params,
      state: code,
    });
  };
  return (
    <div style={{ marginBottom: 15 }}>
      {operate.map(({ code, name, ...props }) => (
        <Button onClick={() => checkoutImpl(code)} {...props} key={code}>
          {name}
        </Button>
      ))}
    </div>
  );
};

export default TradePlanStateOperation;
