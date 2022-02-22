import debounce from "lodash/debounce";
import DynamicForm from "../../../../components/form";
import {useParamsContext} from "../../../../libs/context/paramsProvider";
import config from "./config";

const ProductSearch = () => {
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

export default ProductSearch;