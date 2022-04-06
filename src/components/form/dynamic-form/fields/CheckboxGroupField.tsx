import { Checkbox, FormInstance, Space } from 'antd'
import ComplexFields from './ComplexFields'

type emums = 'vertical' | 'horizontal'
export default function CheckboxGroupField({
  form,
  options = [],
  optionsName = 'label',
  optionsKey = 'value',
  description,
  direction = 'horizontal',
  ...extraProps
}: {
  form: FormInstance
  direction?: emums
  options?: Array<any>
  description?: {
    key: string
    func: Function
  }
  optionsName?: string | undefined
  optionsKey?: string | undefined
}) {
  return (
    <Checkbox.Group {...extraProps}>
      <Space direction={direction}>
        {options.map(
          ({ direction = 'horizontal', suffix, ...restItem }, idx) => (
            <Space key={idx} direction={direction}>
              <Checkbox value={restItem[optionsKey]}>
                {restItem[optionsName]}
              </Checkbox>
              {description && description.func(restItem[description.key])}
              {suffix ? <ComplexFields form={form} innerForm={suffix} /> : null}
            </Space>
          ),
        )}
      </Space>
    </Checkbox.Group>
  )
}
