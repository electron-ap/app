import { FieldType } from 'libs/types/formField'
export const formConfig: Array<FieldType> = [
  {
    name: 'companyName',
    label: '',
    type: 'select',
    extraProps: {
      options: [
        {
          label: '公司01',
          value: '01',
        },
        {
          label: '公司02',
          value: '02',
        },
      ],
    },
  },
  {
    name: 'number',
    label: '数量',
    type: 'number',
    extraProps: {
      style: {
        width: '100%',
      },
    },
  },
  {
    name: 'price',
    label: '单价',
    type: 'number',
    extraProps: {
      style: {
        width: '100%',
      },
    },
  },
  {
    name: 'totalMoney',
    label: '总金额',
    type: 'number',
    extraProps: {
      style: {
        width: '100%',
      },
    },
  },
  {
    name: 'signingDate',
    label: '',
    type: 'date',
    extraProps: {
      style: {
        width: '100%',
      },
    },
  },
]
