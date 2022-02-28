import { addPlan } from "libs/api/trade-plan";
import { submitType } from "libs/types/formField";
import AddAndEditor from "../addAndEditor/addAndEditor";
import { useNavigate } from "react-router-dom";

const TradePlanAdd = () => {
  const navigate = useNavigate();
  const submitImpl = async (...args: submitType) => {
    let [value, suc, err] = args;
    try {
      await addPlan(value);
      suc();
      navigate(-1);
    } catch (error) {
      err();
    }
  };

  return <AddAndEditor submitImpl={submitImpl} title={"新增计划"} />;
};

export default TradePlanAdd;
