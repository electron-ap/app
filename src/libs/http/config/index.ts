import fetchImplement from "libs/http";
import qs from "qs";
import util from "libs/utils/util";
import { httpContentType } from "libs/types/contentType";

class defaultConfig {
  readonly headers = {
    "Content-Type": "application/json;charset=utf-8",
  };
  protected defaultPath: string;
  constructor() {
    this.defaultPath = "http://139.224.110.251:8686/api";
  }
  computedIo = (
    url: string,
    params = {
      headers: this.headers,
    }
  ) => {
    // @ts-ignore
    params.headers["Authorization"] =
      "Bearer " + util.getStorage("accessToken");
    return fetchImplement(this.defaultPath + url, params);
  };

  exceptGet<T>(url: string, params: T, config: any) {
    const { body } = config;
    let computed;
    const type: httpContentType = config.headers["Content-Type"];
    switch (type) {
      case "application/x-www-accountForm-urlencoded":
        computed = qs.stringify({ ...body, ...params });
        break;
      case "multipart/form-data":
        delete config.headers["Content-Type"];
        computed = params;
        break;
      case "application/json;charset=utf-8":
      default:
        computed = JSON.stringify({ ...body, ...params });
        break;
    }

    return this.computedIo(url, { ...config, body: computed });
  }

  commonImpl(url: string, options: RequestInit = {}, type: string) {
    const config = {
      method: type,
      headers: this.headers,
      ...options,
    };
    return <T>(params?: T) => {
      return this.exceptGet(url, params, config);
    };
  }
}

class Index extends defaultConfig {
  get(
    url: string,
    options: {
      [v: string]: unknown;
      headers?: {
        "Content-Type": httpContentType;
      };
    } = {}
  ) {
    const { headers = this.headers, ...initialValue } = options;
    return <T>(params?: T) => {
      const computed = { ...initialValue, ...params };
      const computedUrl = url + `?${qs.stringify(computed)}`;
      return this.computedIo(computedUrl, {
        headers,
      });
    };
  }

  post(url: string, options: RequestInit = {}) {
    return this.commonImpl(url, options, "POST");
  }

  put(url: string, options: RequestInit = {}) {
    return this.commonImpl(url, options, "PUT");
  }

  delete(url: string, options: RequestInit = {}) {
    return this.commonImpl(url, options, "DELETE");
  }
}

const xhrFactory = (() => {
  let instance: Index | null = null;
  return () => {
    if (!instance) {
      instance = new Index();
    }
    return instance;
  };
})();

export default xhrFactory();
