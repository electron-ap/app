import TradePlanOperation from "./operation";
import TradePlanSearch from "./search";
import TradePlanStateOperation from "./stateOperation";
import TradePlanTable from "./table";

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
