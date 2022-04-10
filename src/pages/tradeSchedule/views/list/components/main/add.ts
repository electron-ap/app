import { FieldType } from 'libs/types/formField'
const fieldsForm: Array<FieldType> = [
  {
    label: '',
    name: 'name',
    type: 'text',
    extraProps: {
      style: {
        width: 340,
      },
      placeholder: '请填写排期名称',
    },
  },
  {
    label: '',
    name: 'dateRange',
    type: 'range',
    extraProps: {
      style: {
        width: 340,
      },
    },
  },
]

export const addConfig = {
  saveText: '',
  fields: fieldsForm,
}
