import { message } from "antd";
import util from "../utils/util";

const originFetch = fetch;
Object.defineProperty(window, "fetch", {
  configurable: true,
  enumerable: true,
  get() {
    return (url: string, options: any) => {
      return originFetch(url, options).then(async (response) => {
        console.log(response);
        let data;
        const type = options.headers["Content-Type"];
        switch (type) {
          case "blob":
            data = await response.blob();
            break;
          case "text":
            data = await response.text();
            break;
          case "formData":
            data = await response.formData();
            break;
          default:
            data = await response.json();
            break;
        }
        return Promise.resolve(data);
      });
    };
  },
});

export default function fetchImplement(
  url: RequestInfo,
  config: RequestInit
): Promise<any> {
  return new Promise(function (resolve, reject) {
    fetch(url, config)
      .then((data: any) => {
        if (!data.code) {
          resolve(data);
        } else if (data.code === 401) {
          message.warning(data.msg, 1).then(() => {
            util.clearStorage("__authInfo__");
            window.location.reload();
          });
        } else if (data.code === 200) {
          if ([null].includes(data.data)) {
            message.success(data.msg);
          }
          resolve(data.data);
        } else {
          throw new Error(data.msg);
        }
      })
      .catch((error) => {
        message.warning(error.message);
        reject(error);
      });
  });
}
