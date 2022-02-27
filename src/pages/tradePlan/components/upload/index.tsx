import { Button, Space, Table } from "antd";
import TableJsx from "components/table";
import { fetchModel, importPlan } from "libs/api/trade-plan";
import uploadOperate, { columns } from "pages/tradePlan/config/upload";

const UploadForm = () => {
  const handler = (e: any) => {
    const button = e.target.closest("button");
    const code = button.dataset.code;
    console.log(code);
    switch (code) {
      case "1":
        save();
        break;
      case "2":
        loadModel();
        break;
      case "3":
        upload();
        break;
      default:
        break;
    }
  };

  const save = () => {};

  const loadModel = async () => {
    try {
      const blob = await fetchModel();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", `计划模版.xls`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {}
  };

  const upload = async () => {
    // const data = await importPlan()
  };

  return (
    <>
      <Table dataSource={[]} columns={columns} />
      <Space size={"large"}>
        {uploadOperate.map((item) => (
          <Button
            key={item.code}
            data-code={item.code}
            onClick={handler}
            type={item.type}
          >
            {item.name}
          </Button>
        ))}
      </Space>
    </>
  );
};

export default UploadForm;
