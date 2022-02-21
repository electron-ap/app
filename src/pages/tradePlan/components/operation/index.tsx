import { Button } from "antd";
import { operate } from "pages/tradePlan/config/operate";

const TradePlanOperation = () => {
  const checkoutImpl = (code: string) => {};
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
