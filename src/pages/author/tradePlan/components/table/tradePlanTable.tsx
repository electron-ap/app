import TableJsx from "components/table";
import { TablePropsType } from "libs/types/table";
import { modelHandler } from "libs/utils/model";
import { columns } from "../../config/table";

const PlanTableJsx = ({ params, queryKey, ...resetProps }: TablePropsType) => {
  const callback = (actions: string, data: string) => {
    switch (actions) {
      case "delete":
        deleteHandler(data);
        break;
      default:
        break;
    }
    console.log(actions, data);
  };

  const deleteHandler = (data: string) => {
    modelHandler({
      onOk: () => {
        console.log(data);
      },
    });
  };

  return (
    <TableJsx
      callback={callback}
      size={"small"}
      {...resetProps}
      columns={columns}
    />
  );
};

export default PlanTableJsx;
