import {
  CloudUploadOutlined,
  DeleteOutlined,
  ImportOutlined,
  LinkOutlined,
  PlusCircleOutlined,
  ShareAltOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { ButtonType } from 'antd/lib/button'

export const operate: Array<operateType.optAction<SchedularDetail.actionType>> =
  [
    {
      code: 'add',
      name: '添加贸易链',
      icon: <PlusCircleOutlined />,
      type: 'primary' as ButtonType,
    },
    {
      code: 'share',
      name: '共享贸易链',
      icon: <ShareAltOutlined />,
      style: {
        margin: '0 10px',
      },
    },
    {
      code: 'publish',
      name: '发布贸易链',
      icon: <CloudUploadOutlined />,
      style: {
        marginRight: 10,
      },
    },
    // {
    //     code: "preview",
    //     name: "预览",
    //     icon: <EyeOutlined />,
    //     style: {
    //         margin: "0 10px",
    //     },
    // },
    {
      code: 'import',
      name: '导出为表格',
      icon: <ImportOutlined />,
    },
    {
      code: 'download',
      name: '关联计划',
      icon: <LinkOutlined />,
      style: {
        margin: '0 10px',
      },
    },
    {
      code: 'upload',
      name: '导入贸易链',
      icon: <UploadOutlined />,
    },
    {
      code: 'batchDelete',
      name: '批量删除',
      icon: <DeleteOutlined />,
      type: 'danger' as ButtonType,
      style: {
        margin: '0 10px',
      },
    },
  ]
