import { FieldType } from "libs/types/formField";
import LoadButton from "../components/upload/loadModel";

const uploadFields: Array<FieldType> = [
  {
    label: "上传",
    name: "upload",
    rules: [{ required: true, message: "请选择上传文件" }],
    type: "upload",
    style: {
      width: 340,
    },
    suffixIcon: LoadButton,
    extraProps: {
      text: "上传Excel",
      maxLength: 1,
      accept: ".xlsx, .xls",
    },
  },
];

export default uploadFields;
