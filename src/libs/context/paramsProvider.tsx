import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
} from "react";
import { paramsType } from "libs/types/queryParamsType";
const ParamsProvider = createContext<{
  selectsRow: Array<any>;
  setSelectsRow: Dispatch<Array<any>>;
  params: paramsType | null;
  setParams: Dispatch<paramsType | null>;
} | null>(null);

ParamsProvider.displayName = "paramsContext";

const ParamsContextProvider = ({ children }: { children: ReactNode }) => {
  const [params, setParams] = useState<paramsType | null>(null);
  const [selectsRow, setSelectsRow] = useState<Array<any>>([]);

  return (
    <ParamsProvider.Provider
      value={{
        selectsRow,
        setSelectsRow,
        params,
        setParams,
      }}
    >
      {children}
    </ParamsProvider.Provider>
  );
};

export default ParamsContextProvider;

export const useParamsContext = () => {
  const context = useContext(ParamsProvider);
  if (!context) {
    throw new Error("useParamsContext调用必须在ParamsContextProvider里面");
  }
  return context;
};
