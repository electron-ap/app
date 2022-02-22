// 贸易计划
import one from "components/pheader/img/1.png";
import TradePlan from "pages/tradePlan";
import TradePlanJsx from "pages/tradePlan/components";
import TradePlanAdd from "pages/tradePlan/components/add";

import two from "components/pheader/img/2.png";
import TradeSchedule from "pages/tradeSchedule";
import three from "components/pheader/img/3.png";
import Information from "pages/information";
import four from "components/pheader/img/4.png";
import Account from "pages/account";
import five from "components/pheader/img/5.png";
import System from "pages/system";

import { ReactNode } from "react";
import { PathRouteProps } from "react-router-dom";

export interface RouterType extends PathRouteProps {
  url?: string;
  title?: string;
  children?: Array<Partial<PathRouteProps>>;
}

const routerArr: Array<RouterType> = [
  {
    url: one,
    title: "贸易计划",
    path: "TradePlan",
    element: <TradePlan />,
    children: [
      {
        element: <TradePlanJsx />,
      },
      {
        path: "add",
        element: <TradePlanAdd />,
      },
    ],
  },
  {
    url: two,
    title: "贸易排期",
    path: "TradeSchedule",
    element: <TradeSchedule />,
  },
  {
    url: three,
    title: "信息管理",
    path: "Information",
    element: <Information />,
  },
  {
    url: four,
    title: "账户管理",
    path: "Account",
    element: <Account />,
  },
  {
    url: five,
    title: "系统设置",
    path: "System",
    element: <System />,
  },
];

export default routerArr;
