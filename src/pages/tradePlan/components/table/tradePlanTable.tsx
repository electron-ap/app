import TableJsx from "components/table";
import { getDetailPlan, tradePlanDelete } from "libs/api/trade-plan";
import { TablePropsType } from "libs/types/table";
import { modelHandler } from "libs/utils/model";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { columns } from "../../config/table";

const PlanTableJsx = ({ params, queryKey, ...resetProps }: TablePropsType) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const callback = (actions: string, data: { [v: string]: unknown }) => {
    switch (actions) {
      case "delete":
        deleteHandler(data);
        break;
      case "edit":
        editHandler(data);
        break;
      default:
        break;
    }
    console.log(actions, data);
  };

  const editHandler = async (data: { [v: string]: unknown }) => {
    navigate(`/TradePlan/editor?id=${data.id}`);
  };

  const deleteHandler = (data: { [v: string]: unknown }) => {
    modelHandler({
      onOk: async (e: any) => {
        e();
        await tradePlanDelete({ ids: [data.id] });
        queryClient.invalidateQueries(queryKey);
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
