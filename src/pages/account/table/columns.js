import DownMenuJsx from '../../../components/downmenu'
import useAccount from '../hooks'
import { DeleteOutlined, FormOutlined } from '@ant-design/icons'

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
]

export const columns = [
  {
    title: '序号',
    dataIndex: 'orderNumber',
    width: 80,
    render: (text, data, ind) => ind + 1,
  },
  {
    title: '账号名称',
    width: 160,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '角色',
    width: 160,
    dataIndex: 'rolesName',
    key: 'rolesName',
  },
  {
    title: '电子邮箱',
    width: 160,
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '联系方式',
    width: 160,
    dataIndex: 'telephone',
    key: 'telephone',
  },
  {
    title: '创建时间',
    width: 160,
    dataIndex: 'gmt_create',
    key: 'gmt_create',
  },
  {
    title: '操作',
    width: 80,
    dataIndex: 'action',
    render: (text, record) => <IpJsx record={record} />,
  },
]

const IpJsx = ({ record }) => {
  const handlerImpl = useAccount('trade')
  return (
    <DownMenuJsx actions={actions} handlerImpl={handlerImpl} record={record} />
  )
}
