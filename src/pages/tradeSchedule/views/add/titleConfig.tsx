import { FormInstance } from 'antd'
import dynamicFormFields from 'components/form/dynamicFormFields'
import { companyProduct } from 'libs/api/trade-plan'
import { FieldType } from 'libs/types/formField'
import { useEffect, useState } from 'react'

const ExtralSelect = ({ form }: { form: FormInstance }) => {
  const [data, setData] = useState<Array<FieldType>>([
    {
      name: 'producetName',
      rules: [{ required: true, message: '请输入' }],
      type: 'select',
      extraProps: {
        placeholder: '请选择',
        optionsKey: 'name',
        optionsName: 'name',
        style: { width: 120 },
        options: [],
      },
    },
  ])

  useEffect(() => {
    ;(async () => {
      const data = await companyProduct()
      setData((prev) => {
        prev[0].extraProps!.options = data.list
        return [...prev]
      })
    })()
  }, [])

  return <>{dynamicFormFields(data, form)}</>
}

const addFields: Array<FieldType> = [
  {
    name: 'name',
    rules: [{ required: true, message: '请输入' }],
    type: 'text',
    extraProps: {
      placeholder: '请输入',
      style: {
        display: 'inlineBlock',
        minWidth: 20,
      },
    },
  },
  {
    name: 'producetName',
    type: 'slot',
    extraProps: {
      render: (form: FormInstance) => <ExtralSelect form={form} />,
    },
  },
]

export default addFields
