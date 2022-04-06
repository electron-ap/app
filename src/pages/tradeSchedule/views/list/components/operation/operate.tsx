export const operate: Array<operateType.optAction<Schedular.actionType>> = [
  {
    code: 'all',
    name: '全部',
    type: 'primary',
  },
  {
    code: 'noStart',
    name: '未开始',
    style: {
      margin: '0 10px',
    },
  },
  {
    code: 'process',
    name: '进行中',
  },
  {
    code: 'danger',
    name: '告警',
    type: 'danger',
    style: {
      margin: '0 10px',
      background: '#FEAE4D',
      border: 'solid 1px #FEAE4D',
    },
  },
  {
    code: 'error',
    name: '异常',
    type: 'danger',
  },
  {
    code: 'success',
    name: '已完成',
    style: {
      margin: '0 0 0 10px',
    },
  },
]
