import { Tag } from 'antd'
import DownMenuJsx from '../../../../../components/downmenu'
import { BlockOutlined } from '@ant-design/icons'
import useInformation from '../../hooks'

const actions = [
  {
    code: 'linkCompany',
    name: '关联公司',
    type: 'text',
    style: { width: 100, textAlign: 'left', color: '#666' },
    icon: <BlockOutlined />,
  },
  {
    code: 'linkTag',
    name: '关联tag',
    type: 'text',
    style: { width: 100, textAlign: 'left', color: '#666' },
    icon: <BlockOutlined />,
  },
]

export const columns = [
  {
    title: '公司编码',
    dataIndex: 'orderNumber',
    width: 100,
    render: (text, data, ind) => ind + 1,
  },
  {
    title: '公司名称',
    width: 200,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '简称',
    width: 200,
    dataIndex: 'abbreviation',
    key: 'abbreviation',
  },
  {
    title: '英文缩写',
    width: 200,
    dataIndex: 'company_code',
    key: 'company_code',
  },
  {
    title: '公司类型',
    width: 200,
    dataIndex: 'categoryName',
    key: 'categoryName',
  },
  {
    title: '关联公司',
    width: 200,
    dataIndex: 'companyrelateds',
    key: 'companyrelateds',
    render: (text) => {
      return text?.map((item, index) => {
        return (
          <Tag key={index} color="magenta">
            {item.name}
          </Tag>
        )
      })
    },
  },
  {
    title: '所属tag',
    width: 200,
    dataIndex: 'tags',
    key: 'tags',
    render: (arr) => {
      return arr?.map((item) => {
        return <Tag key={item.tagId}>{item.tagName}</Tag>
      })
    },
  },
  {
    title: '操作',
    width: 80,
    dataIndex: 'action',
    key: 'action',
    // fixed: "right",
    render: (text, record) => <IpJsx record={record} />,
  },
]

const IpJsx = ({ record }) => {
  const handlerImpl = useInformation()
  return (
    <DownMenuJsx actions={actions} handlerImpl={handlerImpl} record={record} />
  )
}
// <ActionsJsx record={record} actions={actions} />,
