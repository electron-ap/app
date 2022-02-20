import ParamsContextProvider from "libs/context/paramsProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import PlanJsx from "./tradePlan";

const MainJsx = () => {
  const client = (() => {
    let intance = null;
    console.log(8);
    if (!intance) {
      console.log(10);
      intance = new QueryClient();
    }
    return intance;
  })();
  return (
    <QueryClientProvider client={client}>
      <ParamsContextProvider>
        <PlanJsx />
      </ParamsContextProvider>
    </QueryClientProvider>
  );
};

export default MainJsx;
