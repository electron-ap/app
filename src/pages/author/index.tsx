import PHeader from "../components/pheader";
import one from "../components/pheader/img/1.png";
import TradePlan from "../tradePlan";
import two from "../components/pheader/img/2.png";
import TradeSchedule from "../tradeSchedule";
import three from "../components/pheader/img/3.png";
import Information from "../information";
import four from "../components/pheader/img/4.png";
import Account from "../account";
import five from "../components/pheader/img/5.png";
import System from "../system";
import { Route, Routes, Navigate } from "react-router-dom";
import ParamsContextProvider from "libs/context/paramsProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const routerArr = [
  {
    key: 1,
    url: one,
    title: "贸易计划",
    route: "TradePlan",
    component: <TradePlan />,
  },
  {
    key: 2,
    url: two,
    title: "贸易排期",
    route: "TradeSchedule",
    component: <TradeSchedule />,
  },
  {
    key: 3,
    url: three,
    title: "信息管理",
    route: "Information",
    component: <Information />,
  },
  {
    key: 4,
    url: four,
    title: "账户管理",
    route: "Account",
    component: <Account />,
  },
  {
    key: 5,
    url: five,
    title: "系统设置",
    route: "System",
    component: <System />,
  },
];

const MainJsx = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <ParamsContextProvider>
        {/*<PHeader routerArr={routerArr} />*/}
        <Routes>
          <Route path="/" element={<Navigate replace to={"/TradePlan"} />} />
          {routerArr.map((item) => {
            return (
              <Route
                path={item.route}
                element={item.component}
                key={item.key}
              />
            );
          })}
        </Routes>
      </ParamsContextProvider>
    </QueryClientProvider>
  );
};

export default MainJsx;
