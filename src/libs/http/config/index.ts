import fetchImplement from "libs/http";
import qs from "qs";
import util from "libs/utils/util";

class defaultConfig {
  readonly headers = {
    "Content-Type": "application/json;charset=utf-8",
  };
  protected defaultPath: string;
  protected config: any;
  constructor() {
    this.defaultPath = "/api/";
    this.config = {};
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

  exceptGet<T>(url: string, params: T) {
    const computed = { ...this.config.body, ...params };
    if (
      this.config.headers["Content-Type"] ===
      "application/x-www-form-urlencoded"
    ) {
      this.config.body = qs.stringify(computed);
    } else {
      this.config.body = JSON.stringify(computed);
    }
    return this.computedIo(url, this.config);
  }
}

class Index extends defaultConfig {
  get(url: string, initialValue?: object) {
    return <T>(params?: T) => {
      const computed = { ...initialValue, ...params };
      const computedUrl = url + `?${qs.stringify(computed)}`;
      return this.computedIo(computedUrl);
    };
  }

  post(url: string, options: RequestInit = {}) {
    this.config = {
      method: "POST",
      headers: this.headers,
      ...options,
    };
    return <T>(params?: T) => {
      return this.exceptGet(url, params);
    };
  }

  put(url: string, options: RequestInit = {}) {
    this.config = {
      method: "PUT",
      headers: this.headers,
      ...options,
    };
    return <T>(params?: T) => {
      return this.exceptGet(url, params);
    };
  }

  delete(url: string, options: RequestInit = {}) {
    this.config = {
      method: "DELETE",
      headers: this.headers,
      ...options,
    };
    return <T>(params?: T) => {
      return this.exceptGet(url, params);
    };
  }
}

const xhrFactory = (() => {
  let instance: Index | null = null;

  const createInstance = () => {
    console.log(82);
    if (!instance) {
      console.log(84);
      instance = new Index();
    }
    return instance;
  };
  return createInstance;
})();

export default xhrFactory();
