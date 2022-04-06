import { Form, Button, message, Space } from 'antd'
import React, { useCallback, useEffect, useState, memo } from 'react'
import {
  Action,
  FieldType,
  submitType,
  TransformType,
} from 'libs/types/formField'
import dynamicFormFields from './dynamicFormFields'
import { FormProps } from 'antd/lib/form/Form'
import get from 'lodash/get'
import set from 'lodash/set'
import omit from 'lodash/omit'
import cloneDeep from 'lodash/cloneDeep'
import hasIn from 'lodash/hasIn'

export interface FormAddProps extends FormProps {
  saveText?: string
  name?: string
  resetText?: string
  initialValues?: { [v: string]: unknown }
  onSubmit: (...args: submitType) => void
  fields: Array<FieldType>
  transformSubmitDataConfig?: Array<TransformType>
  otherAction?: Array<Action>
}

const DynamicForm = ({
  saveText,
  resetText,
  name = 'basic',
  layout = 'horizontal',
  wrapperCol = {},
  labelCol = {},
  initialValues,
  onSubmit,
  fields: defaultFields,
  transformSubmitDataConfig = [],
  otherAction = [],
}: FormAddProps) => {
  const [form] = Form.useForm()
  const [fields, setFormFields] = useState<Array<FieldType>>([])
  const [loading, setIsSubmitting] = useState<boolean>(false)
  const [inProgressStatus, setActionsStatus] = useState<{
    [v: string]: boolean
  }>({})
  useEffect(() => {
    setFormFields(defaultFields)
  }, [defaultFields])

  const computedSubmitValues = useCallback(
    async (values: { [v: string]: unknown }) => {
      const forkTransformConfig = cloneDeep(transformSubmitDataConfig)
      while (forkTransformConfig.length > 0) {
        const {
          from,
          isDelete = false,
          to,
          format,
        } = forkTransformConfig.shift() as TransformType

        // flag为falsy类型需要检查不需要转化
        const flag = hasIn(values, from)
        if (!flag) {
          values = omit(values, from)
          continue
        }

        const prevValue = get(values, from)
        const value = get(values, to)
        try {
          const computedValue = await format(prevValue, value)
          set(values, to, computedValue)
          if (isDelete) {
            values = omit(values, from)
          }
        } catch (err: any) {
          const msg = err.message || err.msg || '数据转化失败'
          throw new Error(msg)
        }
      }
      return values
    },
    [transformSubmitDataConfig],
  )

  const onFinish = useCallback(
    async (values) => {
      setIsSubmitting(true)
      try {
        const value = await computedSubmitValues(values)
        onSubmit(
          value,
          (msg) => {
            const { setFieldsValue, getFieldsValue } = form
            setIsSubmitting(false)
            setFieldsValue(getFieldsValue()) // reset accountForm touched state
            if (msg) message.success(msg)
          },
          () => {
            setIsSubmitting(false)
          },
        )
      } catch (err: any) {
        message.error(err.message)
        setIsSubmitting(false)
      }
    },
    [form, onSubmit, computedSubmitValues],
  )

  const onFinishFailed = useCallback(
    ({ errorFields }) => {
      form.scrollToField(errorFields[0].name)
    },
    [form],
  )

  const resetHandler = useCallback(() => {
    form.resetFields()
  }, [form])

  const setActionInProgress = useCallback((key: string, status: boolean) => {
    setActionsStatus((prev) => ({ ...prev, [key]: status }))
  }, [])

  const handlerSubmit = useCallback(
    (key: string, isNeedValidate: boolean, callback: Function) => {
      ;(async () => {
        setActionInProgress(key, true)
        try {
          let computedValue
          if (isNeedValidate) {
            const values = await form.validateFields()
            computedValue = await computedSubmitValues(values)
          }
          callback(() => setActionInProgress(key, false), computedValue)
        } catch (err) {
          setActionInProgress(key, false)
        }
      })()
    },
    [setActionInProgress, form, computedSubmitValues],
  )

  const renderActions = useCallback(() => {
    if (otherAction.length === 0) return
    return otherAction.map(
      ({ key, name, isNeedValidate = false, callback, ...restProps }) => {
        const inProgress = inProgressStatus[key] || false
        const actionProps = {
          key,
          loading: inProgress,
          onClick: handlerSubmit.bind(null, key, isNeedValidate, callback),
          ...restProps,
        }
        return (
          <Button {...actionProps} data-action={key}>
            {name}
          </Button>
        )
      },
    )
  }, [otherAction, inProgressStatus, handlerSubmit])

  return (
    <Form
      {...{
        layout,
        form,
        onFinish,
        onFinishFailed,
        initialValues,
        wrapperCol,
        labelCol,
        name,
      }}
    >
      {dynamicFormFields(fields, form)}
      <Form.Item label=" " colon={false}>
        <Space size={'middle'}>
          {saveText && (
            <Button loading={loading} type="primary" htmlType="submit">
              {saveText}
            </Button>
          )}
          {resetText && <Button onClick={resetHandler}>{resetText}</Button>}
          {renderActions()}
        </Space>
      </Form.Item>
    </Form>
  )
}

export default memo(DynamicForm)
