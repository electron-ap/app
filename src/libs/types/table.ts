import { paramsType } from "./queryParamsType";

type tableDataType = {
  list: Array<any>;
  currentPage?: number;
  total?: number;
  perPage?: number;
};
export interface TablePropsType {
  params: paramsType | null;
  queryKey: string;
  data: tableDataType;
  [v: string]: unknown;
}

export interface TableType {
  callback?: (...arg: Array<any>) => void;
  data: tableDataType;
  columns: Array<{ [v: string]: unknown }>;
  [v: string]: unknown;
}
