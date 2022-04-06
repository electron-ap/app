import DynamicForm from 'components/form'
import { useParamsContext } from 'libs/context/paramsProvider'
import { submitType } from 'libs/types/formField'
import debounce from 'lodash/debounce'
import formConfig from './search'

const DetailSearch = () => {
  const { setParams } = useParamsContext()

  const onSubmit = debounce((...params: submitType) => {
    const [value, suc] = params
    setParams(value)
    suc()
  }, 200)

  return <DynamicForm onSubmit={onSubmit} {...formConfig} />
}

export default DetailSearch
