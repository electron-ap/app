import DynamicForm from "../../../components/form";
import {useParamsContext} from "../../../libs/context/paramsProvider";
import debounce from "lodash/debounce";
import config from './config';

const AccountSearch = () => {
  const { setParams } = useParamsContext();

  const onSubmit = debounce((...params) => {
    const [value, suc] = params;
    setParams(value);
    suc();
  }, 200);

  return (
    <>
      <DynamicForm onSubmit={onSubmit} {...config} />
    </>
  )
}

export default AccountSearch;