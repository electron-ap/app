import { Button, message } from "antd";
import { useParamsContext } from "libs/context/paramsProvider";
import { operate } from "pages/tradePlan/config/operate";
import { exportExcel } from "libs/utils/excel";
import { columns } from "pages/tradePlan/config/table";
import { tradePlanDelete } from "libs/api/trade-plan";
import { useQueryClient } from "react-query";
import { modelHandler } from "libs/utils/model";
import { useNavigate } from "react-router-dom";
import dialogJsx from "libs/utils/dialogJsx";
import UploadForm from "../upload";
import { isEmpty } from "lodash";

const TradePlanOperation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { selectsRow } = useParamsContext();

  const addImpl = () => {
    navigate("/TradePlan/add");
  };

  const uploadImpl = () => {
    dialogJsx(UploadForm, {
      dialogConfig: {
        title: "上传计划",
      },
      restsProps: undefined,
    });
  };

  const downloadImpl = () => {
    if (isEmpty(selectsRow)) {
      message.info("请选择需要导出的计划");
      return;
    }
    exportExcel(columns, selectsRow);
  };

  const deleteImpl = () => {
    if (isEmpty(selectsRow)) {
      message.info("请选择需要删除的计划");
      return;
    }
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
