import random from 'lodash/random'

interface NodeParams {
  name: string
  x: number
  y: number
}

export const copyNode = ({ name, x, y }: NodeParams) => {
  const id = `${Date.now()}`
  return {
    id,
    name,
    inPorts: [
      {
        tableName: 'germany_credit_data',
        sequence: 1,
        description: '输入1',
        id: id + 100000,
      },
      {
        tableName: 'germany_credit_data',
        sequence: 2,
        description: '输入2',
        id: id + 200000,
      },
    ],
    outPorts: [
      {
        tableName: 'germany_credit_data',
        sequence: 1,
        description: '输出表1',
        id: id + 300000,
      },
      {
        tableName: 'germany_credit_data',
        sequence: 2,
        description: '输出表2',
        id: id + 400000,
      },
    ],
    positionX: x + 200 + random(20, false),
    positionY: y + random(10, false),
    codeName: 'source_11111',
    catId: 1,
    nodeDefId: 111111,
    category: 'source',
    status: 3,
    groupId: 0,
  }
}
export const addNode = ({ name, x, y, ...rest }: NodeParams) => {
  const id = `${Date.now()}`
  return {
    ...rest,
    id,
    name,
    contractInfo: {
      contract: '0%',
      logistics: '0%',
      funds: '0%',
      bill: '0%',
    },
    initialValues: {},
    inPorts: [
      {
        tableName: 'germany_credit_data',
        sequence: 1,
        description: '输入1',
        id: id + '_in_1',
      },
    ],
    outPorts: [
      {
        tableName: 'germany_credit_data',
        sequence: 1,
        description: '输出表1',
        id: id + '_out_1',
      },
    ],
    positionX: x,
    positionY: y,
    codeName: 'source_11111',
    catId: 1,
    nodeDefId: 111111,
    category: 'source',
    status: 3,
    groupId: 0,
  }
}

export const queryGraph = (id: string) => {
  return {
    lang: 'zh_CN',
    success: true,
    data: initData,
    Lang: 'zh_CN',
  }
}

export const addNodeGroup = async (groupName: string) => {
  return {
    success: true,
    data: {
      group: {
        name: groupName,
        id: Date.now(),
      },
    },
  }
}

const initData = {
  nodes: [
    {
      id: '1603716783816',
      name: 'basic',
      initialValues: {},
      inPorts: [
        {
          tableName: 'germany_credit_data',
          sequence: 1,
          description: '输入1',
          id: '1603716783816_in_1',
        },
        {
          tableName: 'germany_credit_data',
          sequence: 2,
          description: '输入2',
          id: '1603716783816_in_2',
        },
      ],
      outPorts: [
        {
          tableName: 'germany_credit_data',
          sequence: 1,
          description: '输出表1',
          id: '1603716783816_out_1',
        },
        {
          tableName: 'germany_credit_data',
          sequence: 2,
          description: '输出表2',
          id: '1603716783816_out_2',
        },
      ],
      positionX: -200,
      positionY: -300,
      groupId: 0,
    },
    {
      id: '1603716786205',
      name: 'basic',
      initialValues: {},
      inPorts: [
        {
          tableName: 'germany_credit_data',
          sequence: 1,
          description: '输入1',
          id: '1603716786205_in_1',
        },
        {
          tableName: 'germany_credit_data',
          sequence: 2,
          description: '输入2',
          id: '1603716786205_in_2',
        },
      ],
      outPorts: [
        {
          tableName: 'germany_credit_data',
          sequence: 1,
          description: '输出表1',
          id: '1603716786205_out_1',
        },
        {
          tableName: 'germany_credit_data',
          sequence: 2,
          description: '输出表2',
          id: '1603716786205_out_2',
        },
      ],
      positionX: -369,
      positionY: -161,
      groupId: 0,
    },
  ],
  links: [
    {
      source: '1603716783816',
      target: '1603716786205',
      outputPortId: '1603716783816_out_1',
      inputPortId: '1603716786205_in_1',
    },
  ],
}
