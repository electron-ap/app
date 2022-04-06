// 贸易计划
import one from 'components/pheader/img/1.png'
import TradePlan from 'pages/tradePlan'
import TradePlanJsx from 'pages/tradePlan/components'
import TradePlanAdd from 'pages/tradePlan/components/add'
import TradePlanEditor from 'pages/tradePlan/components/editor'

import two from 'components/pheader/img/2.png'
import TradeSchedule from 'pages/tradeSchedule'
import three from 'components/pheader/img/3.png'

// 信息管理
import Information from 'pages/information'
import Product from 'pages/information/components/product'
import Company from 'pages/information/components/company'
import AddCompany from 'pages/information/components/company/addCompany'

import four from 'components/pheader/img/4.png'
import Account from 'pages/account'
import five from 'components/pheader/img/5.png'

import System from 'pages/system'
import { PathRouteProps } from 'react-router-dom'
import TradeScheduleJsx from 'pages/tradeSchedule/views/list'
import TradeScheduleAdd from 'pages/tradeSchedule/views/add'
import ChainJsx from 'pages/tradeSchedule/views/chain'

interface RouterTypeSon {
  title: string
  url: string
}

export interface RouterType extends PathRouteProps {
  icon?: string
  title?: string
  children?: Array<Partial<PathRouteProps>>
  secondMenu?: RouterTypeSon[]
}

export const breadcrumbNameMap = {
  '/TradePlan': '贸易计划',
  '/TradePlan/add': '贸易计划新增',
  '/TradePlan/editor': '贸易计划编辑',
  '/TradeSchedule': '贸易排期',
  '/Information': '信息管理',
  '/Information/product': '产品信息',
  '/Information/company': '公司信息',
  '/Account': '账户管理',
  '/TradeSchedule/add': '贸易链条',
  '/TradeSchedule/detailList': '贸易链条列表',
}

const routerArr: Array<RouterType> = [
  {
    icon: one,
    title: '贸易计划',
    path: 'TradePlan',
    element: <TradePlan />,
    children: [
      {
        element: <TradePlanJsx />,
      },
      {
        path: 'add',
        element: <TradePlanAdd />,
      },
      {
        path: 'editor',
        element: <TradePlanEditor />,
      },
    ],
  },
  {
    icon: two,
    title: '贸易排期',
    path: 'TradeSchedule',
    element: <TradeSchedule />,
    children: [
      {
        element: <TradeScheduleJsx />,
      },
      {
        path: 'add',
        element: <TradeScheduleAdd />,
      },
      {
        path: 'detailList/:id',
        element: <ChainJsx />,
      },
    ],
  },
  {
    icon: three,
    title: '信息管理',
    path: 'Information',
    element: <Information />,
    children: [
      {
        element: <Company />,
      },
      {
        path: 'product',
        element: <Product />,
      },
      {
        path: 'company',
        element: <Company />,
      },
      {
        path: 'addCompany',
        element: <AddCompany />,
      },
    ],
    secondMenu: [
      {
        title: '公司信息',
        url: '/Information/company',
      },
      {
        title: '产品信息',
        url: '/Information/product',
      },
    ],
  },
  {
    icon: four,
    title: '账户管理',
    path: 'Account',
    element: <Account />,
  },
  {
    icon: five,
    title: '系统设置',
    path: 'System',
    element: <System />,
  },
]

export default routerArr
