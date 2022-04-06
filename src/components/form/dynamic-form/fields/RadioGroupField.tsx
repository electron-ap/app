import { Radio, Space, FormInstance } from 'antd'
import ComplexFields from './ComplexFields'

type emums = 'vertical' | 'horizontal'
export default function RadioGroupField({
  form,
  options,
  optionsName = 'label',
  optionsKey = 'value',
  direction = 'horizontal',
  ...extraProps
}: {
  form: FormInstance
  direction: emums
  options: Array<any>
  optionsName?: string | undefined
  optionsKey?: string | undefined
}) {
  return (
    <Radio.Group {...extraProps}>
      <Space direction={direction}>
        {options.map(
          ({ direction = 'horizontal', suffix, ...restItem }, idx) => (
            <Space key={idx} direction={direction}>
              <Radio value={restItem[optionsKey]}>
                {restItem[optionsName]}
              </Radio>
              {suffix ? <ComplexFields form={form} innerForm={suffix} /> : null}
            </Space>
          ),
        )}
      </Space>
    </Radio.Group>
  )
}
