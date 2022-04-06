import { ButtonType } from 'antd/lib/button'
import { optType } from '../operate'

export const operate: Array<operateType.optAction<optType>> = [
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
      marginRight: 10,
    },
  },
  {
    code: 'upload',
    name: '发布',
  },
]
