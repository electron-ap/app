import { FieldType } from 'libs/types/formField'
import { FormLayout } from 'antd/lib/form/Form'
const fieldsForm: Array<FieldType> = [
  {
    label: '',
    name: 'Content',
    type: 'text',
    extraProps: {
      style: {
        width: 200,
      },
      placeholder: '请输入搜索内容',
    },
  },
]

const config = {
  layout: 'inline' as FormLayout,
  saveText: '查询',
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
  fields: fieldsForm,
}

export default config
