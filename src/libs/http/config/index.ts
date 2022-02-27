import fetchImplement from "libs/http";
import qs from "qs";
import util from "libs/utils/util";

class defaultConfig {
  readonly headers = {
    "Content-Type": "application/json;charset=utf-8",
  };
  protected defaultPath: string;
  constructor() {
    this.defaultPath = "/api";
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
    let computed = { ...body, ...params };
    if (
      config.headers["Content-Type"] ===
      "application/x-www-accountForm-urlencoded"
    ) {
      computed = qs.stringify(computed);
    } else {
      computed = JSON.stringify(computed);
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
        "Content-Type": string;
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
