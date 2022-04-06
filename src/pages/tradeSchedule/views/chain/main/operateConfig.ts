export const operate: Array<operateType.optAction<chainType.actionType>> = [
  {
    code: 'editor',
    name: '编辑',
    type: 'primary',
  },
  {
    code: 'share',
    name: '共享',
    style: {
      margin: '0 10px',
    },
  },
  {
    code: 'publish',
    name: '发布',
    style: {
      marginRight: 10,
    },
  },
  {
    code: 'delete',
    name: '删除',
    type: 'danger',
  },
]
