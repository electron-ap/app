import { FormInstance } from 'antd'
import dynamicFormFields from 'components/form/dynamicFormFields'
import { companyQuery } from 'libs/api/trade-schedule'
import { FieldType } from 'libs/types/formField'
import { useEffect, useState } from 'react'

const companyForm: Array<FieldType> = [
  {
    name: 'companyName',
    label: '',
    type: 'select',
    extraProps: {
      style: { width: '100%', textAlign: 'left' },
      showSearch: true,
      allowClear: true,
      optionsName: 'companyName',
      optionsKey: 'companyName',
      options: [],
    },
  },
]
interface Props {
  form: FormInstance
}

const CompanyForm: React.FC<Props> = ({ form }) => {
  const [data, setData] = useState(companyForm)
  useEffect(() => {
    ;(async () => {
      const company = await companyQuery()
      setData((data) => {
        data[0].extraProps!.options = company
        return [...data]
      })
    })()
  }, [])

  return <>{dynamicFormFields(data, form)}</>
}

export const formConfig: Array<FieldType> = [
  {
    name: 'slot',
    label: '',
    noStyle: true,
    type: 'slot',
    extraProps: {
      render: ({ form }: { form: FormInstance }) => <CompanyForm form={form} />,
    },
  },
  {
    name: 'number',
    label: '数量',
    type: 'number',
    extraProps: {
      addonAfter: '吨',
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
      addonAfter: '元',
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
      addonAfter: '元',
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
