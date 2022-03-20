import { ButtonType } from 'antd/lib/button'

export const operate = [
  {
    code: 'undo',
    name: '撤回',
    type: 'primary' as ButtonType,
  },
  {
    code: 'save',
    name: '保存',
    style: {
      margin: '0 10px',
    },
  },
  {
    code: 'share',
    name: '共享',
    style: {
      margin: '0 10px',
    },
  },
  {
    code: 'upload',
    name: '发布',
  },
]
