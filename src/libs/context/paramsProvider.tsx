import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
} from "react";
import { paramsType } from "libs/types/queryParamsType";

const ParamsProvider = createContext<{
  params: paramsType | null;
  setParams: Dispatch<paramsType | null>;
} | null>(null);

ParamsProvider.displayName = "paramsContext";

const ParamsContextProvider = ({ children }: { children: ReactNode }) => {
  const [params, setParams] = useState<paramsType | null>(null);

  return (
    <ParamsProvider.Provider
      value={{
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
