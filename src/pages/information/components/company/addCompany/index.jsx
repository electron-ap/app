import DynamicForm from "../../../../../components/form";
import config from "./config";

const AddCompany = () => {
  const onSubmit = () => {
    console.log(1231)
  }


  return (
    <div style={{width: 1000, margin: '0 auto'}}>
      <DynamicForm onSubmit={onSubmit} {...config} />
    </div>
  )
}

export default AddCompany;
