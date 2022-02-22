import { Button } from "antd";
import { useParamsContext } from "libs/context/paramsProvider";
import dialogJsx from "libs/utils/dialogJsx";
import { operate } from "pages/tradePlan/config/operate";
import utils from "libs/utils/util";
import { exportExcel } from "libs/utils/excel";
import { columns } from "pages/tradePlan/config/table";
import util from "libs/utils/util";
const TradePlanOperation = () => {
  const { selectsRow } = useParamsContext();

  const addImpl = () => {};

  const uploadImpl = () => {};

  const downloadImpl = () => {
    exportExcel(columns, selectsRow);
    // utils.saveShareContent([selectKey], 'XXXXX.xlsx')
  };

  const deleteImpl = () => {};

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
