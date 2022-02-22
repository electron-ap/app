import { Outlet } from "react-router-dom";
import TradePlanOperation from "./components/operation";
import TradePlanSearch from "./components/search";
import TradePlanStateOperation from "./components/stateOperation";
import TradePlanTable from "./components/table";

const TradePlan = () => {
  return <Outlet />;
};

export default TradePlan;
