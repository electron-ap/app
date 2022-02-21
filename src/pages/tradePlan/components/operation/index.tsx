import { Button } from "antd";
import { useParamsContext } from "libs/context/paramsProvider";
import { operate } from "pages/tradePlan/config/operate";

const TradePlanOperation = () => {
  const { setParams, params } = useParamsContext();
  const checkoutImpl = (code: string) => {
    setParams({
      ...params,
      state: code,
    });
  };
  return (
    <div>
      {operate.map(({ code, name, ...props }) => (
        <Button onClick={() => checkoutImpl(code)} {...props} key={code}>
          {name}
        </Button>
      ))}
    </div>
  );
};

export default TradePlanOperation;
