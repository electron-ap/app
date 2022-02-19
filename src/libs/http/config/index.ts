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
