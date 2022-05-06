import React from 'react'
import { Form, Popover } from 'antd'
import 'antd/lib/style/index.css'
import { useExperimentGraph } from '../../../rx-models/experiment-graph'
import './normal.scss'
import { formConfig } from './config'
import dynamicFormFields from 'components/form/dynamicFormFields'
import dayjs from 'dayjs'
import { InfoCircleOutlined } from '@ant-design/icons'
import { NExperimentGraph } from '../../../rx-models/typing'

export interface Props {
  contractInfo: NExperimentGraph.ConstactType
  experimentId: string
  nodeId: string
  initialValues: object
}

export const NodeFormDemo: React.FC<Props> = ({
  nodeId,
  experimentId,
  contractInfo,
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

  const content = (
    <div className={'popDiv'}>
      <p>合同: {contractInfo.contract}</p>
      <p>物流: {contractInfo.logistics}</p>
      <p>资金: {contractInfo.funds}</p>
      <p>发票: {contractInfo.bill}</p>
    </div>
  )

  return (
    <div className={'normalForm'}>
      <Popover placement="rightTop" content={content}>
        <InfoCircleOutlined className={'infoIcon'} />
      </Popover>
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
