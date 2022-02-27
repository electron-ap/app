import DatePicker from "antd/lib/date-picker";
import moment from "moment";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";

export default function DatePickerField({
  value,
  ...extraProps
}: {
  value: string;
}) {
  return (
    <DatePicker
      locale={locale}
      value={value ? moment(value, "YYYY-MM-DD") : null}
      {...extraProps}
    />
  );
}
