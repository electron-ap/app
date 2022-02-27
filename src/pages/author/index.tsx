import { Route, Routes, Navigate, PathRouteProps } from "react-router-dom";
import ParamsContextProvider from "libs/context/paramsProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import routerArr, { RouterType } from "routes";
import PHeader from "../../components/pheader";
import { useEffect } from "react";
import { getUserInfo } from "../../libs/api/user-api";
import { message } from "antd";
import util from "../../libs/utils/util";

const MainJsx = () => {
  useEffect(() => {
    getUserInfoFunc();
  }, []);

  const getUserInfoFunc = async () => {
    const result = await getUserInfo();
    console.log(result);
  };

  return (
    <>
      <PHeader routerArr={routerArr} />
      <Routes>
        <Route path="/" element={<Navigate replace to={"/TradePlan"} />} />
        {routerArr.map(
          ({ path, element, children = [] }: RouterType, index) => {
            return (
              <Route path={path} element={element} key={index}>
                {children.map((citem: Partial<PathRouteProps>, ind: number) => (
                  <Route index={ind === 0} key={ind} {...citem} />
                ))}
              </Route>
            );
          }
        )}
      </Routes>
    </>
  );
};

export default () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <ParamsContextProvider>
        <MainJsx />
      </ParamsContextProvider>
    </QueryClientProvider>
  );
};
