import DynamicForm from "components/form";

const AddProductList = ({
  fields,
  layout,
}: {
  fields: Array<any>;
  layout: any;
}) => {
  const onSubmit = () => {};
  return (
    <DynamicForm
      fields={fields}
      layout={layout}
      onSubmit={onSubmit}
      saveText={"产品"}
    />
  );
};

export default AddProductList;
