// 贸易计划
import one from "components/pheader/img/1.png";
import TradePlan from "pages/tradePlan";
import TradePlanJsx from "pages/tradePlan/components";
import TradePlanAdd from "pages/tradePlan/components/add";

import two from "components/pheader/img/2.png";
import TradeSchedule from "pages/tradeSchedule";
import three from "components/pheader/img/3.png";

// 信息管理
import Information from "pages/information";
import Product from "pages/information/product";
import Company from "pages/information/company";

import four from "components/pheader/img/4.png";
import Account from "pages/account";
import five from "components/pheader/img/5.png";
import System from "pages/system";

import { PathRouteProps } from "react-router-dom";

interface RouterTypeSon {
  title: string;
  url: string;
}

export interface RouterType extends PathRouteProps {
  icon?: string;
  title?: string;
  children?: Array<Partial<PathRouteProps>>;
  secondMenu?: RouterTypeSon[];
}

const routerArr: Array<RouterType> = [
  {
    icon: one,
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
    icon: two,
    title: "贸易排期",
    path: "TradeSchedule",
    element: <TradeSchedule />,
  },
  {
    icon: three,
    title: "信息管理",
    path: "Information",
    element: <Information />,
    children: [
      {
        element: <Company />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "company",
        element: <Company />,
      },
    ],
    secondMenu: [
      {
        title: "公司信息",
        url: "/Information/company",
      },
      {
        title: "产品信息",
        url: "/Information/product",
      },
    ],
  },
  {
    icon: four,
    title: "账户管理",
    path: "Account",
    element: <Account />,
  },
  {
    icon: five,
    title: "系统设置",
    path: "System",
    element: <System />,
  },
];

export default routerArr;
