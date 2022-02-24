import { Button } from "antd";
import { useParamsContext } from "libs/context/paramsProvider";
import { operate } from "pages/tradePlan/config/operate";
import { exportExcel } from "libs/utils/excel";
import { columns } from "pages/tradePlan/config/table";
import { tradePlanDelete } from "libs/api/trade-plan";
import { useQueryClient } from "react-query";
import { modelHandler } from "libs/utils/model";
import { useNavigate } from "react-router-dom";

const TradePlanOperation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { selectsRow } = useParamsContext();

  const addImpl = () => {
    navigate("/TradePlan/add");
  };

  const uploadImpl = () => {};

  const downloadImpl = () => {
    exportExcel(columns, selectsRow);
  };

  const deleteImpl = () => {
    modelHandler({
      onOk: async (e: any) => {
        e();
        const ids = selectsRow.map((item) => item.id);
        await tradePlanDelete({ ids });
        queryClient.invalidateQueries("trade");
      },
    });
  };

  const checkoutImpl = (code: string) => {
    switch (code) {
      case "add":
        addImpl();
        break;
      case "upload":
        uploadImpl();
        break;
      case "download":
        downloadImpl();
        break;
      case "batchDelete":
        deleteImpl();
        break;
      default:
        break;
    }
    // dialogJsx(() => {
    //   return <div>123</div>
    // }, {
    //   dialogConfig: {
    //     title: '新增'
    //   },
    //   restsProps: {
    //     callback() {
    //       console.log(12123)
    //     }
    //   }
    // })
  };
  return (
    <div>
      {operate.map(({ code, name, ...props }) => (
        <Button onClick={() => checkoutImpl(code)} {...props} key={code}>
          {name}
        </Button>
      ))}
    </div>
  );
};

export default TradePlanOperation;
