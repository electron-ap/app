import Button from "antd/lib/button";
import { fetchModel } from "libs/api/trade-plan";

const LoadButton = () => {
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

  return <Button onClick={loadModel}>下载模版</Button>;
};

export default LoadButton;
