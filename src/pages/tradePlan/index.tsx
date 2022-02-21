import TradePlanOperation from "./components/operation";
import TradePlanSearch from "./components/search";
import TradePlanStateOperation from "./components/stateOperation";
import TradePlanTable from "./components/table";

const TradePlanJsx = () => {
  return (
    <>
      <div className={"topFlex"}>
        <TradePlanSearch />
        <TradePlanOperation />
      </div>
      <TradePlanStateOperation />
      <TradePlanTable />
    </>
  );
};

export default TradePlanJsx;
