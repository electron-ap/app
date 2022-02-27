import { addPlan } from "libs/api/trade-plan";
import { submitType } from "libs/types/formField";
import AddAndEditor from "../addAndEditor/addAndEditor";

const TradePlanAdd = () => {
  const submitImpl = async (...args: submitType) => {
    let [value, suc, err] = args;
    try {
      await addPlan(value);
      suc();
    } catch (error) {
      err();
    }
  };

  return <AddAndEditor submitImpl={submitImpl} />;
};

export default TradePlanAdd;
