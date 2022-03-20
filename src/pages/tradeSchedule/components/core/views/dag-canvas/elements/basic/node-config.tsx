import React from 'react'
import { Form } from 'antd'
import 'antd/lib/style/index.css'
import { useExperimentGraph } from '../../../rx-models/experiment-graph'
import './normal.scss'
import { formConfig } from './config'
import dynamicFormFields from 'components/form/dynamicFormFields'
import dayjs from 'dayjs'

export interface Props {
  experimentId: string
  nodeId: string
  initialValues: object
}

export const NodeFormDemo: React.FC<Props> = ({
  nodeId,
  experimentId,
  initialValues,
}) => {
  const [form] = Form.useForm()

  const expGraph = useExperimentGraph(experimentId)
  const onValuesChange = async (
    changedValues: string | number,
    allValues: any,
  ) => {
    const { signingDate } = allValues
    allValues.signingDate = dayjs(signingDate).format('YYYY-MM-DD')
    expGraph.updateNodeData(nodeId, allValues)
  }

  return (
    <div className={'normalForm'}>
      <Form
        form={form}
        initialValues={initialValues}
        onValuesChange={onValuesChange}
      >
        {dynamicFormFields(formConfig, form)}
      </Form>
    </div>
  )
}
