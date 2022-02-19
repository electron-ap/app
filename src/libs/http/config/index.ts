import fetchImplement from "libs/http/index";
import { defaultPath } from "libs/http/config/originPath";
import qs from "qs";

const xhrFactory = ({
  url = "",
  method = "GET",
  contextType = "application/json",
}) =>
  function fn<T>(params?: T, signal?: AbortSignal) {
    let appendPath = "";
    const config: RequestInit = {
      signal,
      method,
      headers: {
        "Content-Type": contextType,
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoi5rWL6K-V6LSm5Y-3IiwiYWNjb3VudCI6IjExMTEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiLnrqHnkIblkZgiLCJpZCI6IjQiLCJjb21wYW55aWQiOiIxIiwibmJmIjoxNjQ1MjU2ODYwLCJleHAiOjE2NDUzNDMyNjAsImlzcyI6Imh0dHA6Ly8xMjUuMzkuMTg3LjM4Ojg2ODYiLCJhdWQiOiJodHRwOi8vMTI1LjM5LjE4Ny4zODo4Njg2In0.nOKrKlbUcvkUdEvITs2mCkZEKArjbvpeeO_2iGFKrWU",
      },
    };

    if (method === "GET") {
      appendPath += `?${qs.stringify(params)}`;
    } else if (contextType === "application/x-www-form-urlencoded") {
      config.body = qs.stringify(params);
    } else {
      config.body = JSON.stringify(params);
    }
    return fetchImplement(defaultPath + url + appendPath, config);
  };

/**
 * 去除空value的参数
 * @returns {*}
 * @param target
 */
type paramsTy = Array<unknown> | { [k: string]: unknown };

export default xhrFactory;
