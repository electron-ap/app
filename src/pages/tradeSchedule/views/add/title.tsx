import Form from 'antd/lib/form'
import dynamicFormFields from 'components/form/dynamicFormFields'
import formConfig from '../add/titleConfig'
import { ChainModal } from './model'

const AddTitle = () => {
  const { chainParams, addChainParams } = ChainModal.useContainer()
  const [form] = Form.useForm()

  const onValuesChange = async (
    changedValues: string | number,
    allValues: any,
  ) => {
    addChainParams(allValues)
  }

  return (
    <Form
      layout={'inline'}
      form={form}
      initialValues={chainParams}
      onValuesChange={onValuesChange}
    >
      {dynamicFormFields(formConfig, form)}
    </Form>
  )
}

export default AddTitle
