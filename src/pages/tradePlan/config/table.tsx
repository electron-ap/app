import { actionsType } from 'components/actions'
import {
  FormOutlined,
  DeleteOutlined,
  RollbackOutlined,
} from '@ant-design/icons'
import DownMenuJsx from 'components/downmenu'
import useTradePlanOperate from '../hooks'
const actions = [
  {
    code: 'edit',
    name: '编辑',
    type: 'text',
    style: { width: 100, textAlign: 'left', color: '#666' },
    icon: <FormOutlined />,
  },
  {
    code: 'delete',
    name: '删除',
    type: 'text',
    style: { width: 100, textAlign: 'left', color: '#666' },
    icon: <DeleteOutlined />,
  },
  {
    code: 'cancel',
    name: '退回',
    type: 'text',
    style: { width: 100, textAlign: 'left', color: '#666' },
    icon: <RollbackOutlined />,
  },
] as Array<actionsType>
//
// export interface TradePlanType {
//   productName: string;
//   distribution: string;
//   planMonth: string;
//   applyUser: string;
//   invoicePlateType: string;
//   invoiceBalance: string;
//   invoiceTotal: string;
//   invoiceUsable: string;
//   productGeneralCategory: string;
//   state: string;
// }

export const columns = [
  {
    title: '序号',
    dataIndex: 'orderNumber',
    width: 80,
    render: (text: any, data: object, ind: number) => ind + 1,
  },
  {
    title: '公司名称',
    width: 200,
    dataIndex: 'companyName',
    key: 'companyName',
  },
  {
    title: '分配情况',
    width: 80,
    dataIndex: 'distribution',
    key: 'distribution',
  },
  {
    width: 80,
    title: '计划月份',
    dataIndex: 'planMonth',
    key: 'planMonth',
  },
  {
    title: '申请人',
    width: 80,
    dataIndex: 'applyUser',
    key: 'applyUser',
  },
  {
    title: '发票版型',
    width: 80,
    dataIndex: 'invoicePlateType',
    key: 'invoicePlateType',
  },
  {
    title: '单月固定票量（张）',
    width: 150,
    dataIndex: 'invoiceBalance',
    key: 'invoiceBalance',
  },
  {
    title: '上月发票结余（元）',
    width: 180,
    dataIndex: 'invoiceBalance',
    key: 'invoiceBalance',
  },
  {
    title: '发票总金额（元）',
    width: 160,
    dataIndex: 'invoiceTotal',
    key: 'invoiceTotal',
  },
  {
    title: '可使用发票总金额（元）',
    width: 220,
    dataIndex: 'invoiceUsable',
    key: 'invoiceUsable',
  },
  {
    title: '产品总类',
    dataIndex: 'productGeneralCategory',
    width: 80,
    key: 'productGeneralCategory',
  },
  // {
  //     title: "预计贸易总金额（元）",
  //     dataIndex: "tradeAmountTotal",
  //     key: "tradeAmountTotal",
  // },
  // {
  //     title: "毛利率",
  //     dataIndex: "grossMargin",
  //     key: "grossMargin",
  // },
  // {
  //     title: "预计利润（元）",
  //     dataIndex: "profit",
  //     key: "profit",
  // },
  // {
  //     title: "特殊要求",
  //     dataIndex: "specialRequirements",
  //     key: "specialRequirements",
  // },
  // {
  //     title: "关联排期",
  //     dataIndex: "associationScheduling",
  //     key: "associationScheduling",
  // },
  {
    title: '状态',
    width: 80,
    dataIndex: 'state',
    key: 'state',
    render: (text: string) => <span style={{ color: '#FEAE4D' }}>{text}</span>,
  },
  {
    title: '操作',
    width: 100,
    dataIndex: 'action',
    render: (text: string, record: object) => <IpJsx record={record} />,
  },
]

const IpJsx = ({ record }: { record: object }) => {
  const handlerImpl = useTradePlanOperate('trade')
  return (
    <DownMenuJsx actions={actions} handlerImpl={handlerImpl} record={record} />
  )
}
