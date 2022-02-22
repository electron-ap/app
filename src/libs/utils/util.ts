class Util {
  /**
   * 设置  本地缓存
   */
  setStorage(key: string, obj: string | { [v: string]: unknown }) {
    if (typeof obj === "string") {
      window.localStorage.setItem(key, obj);
    } else {
      window.localStorage.setItem(key, JSON.stringify(obj));
    }
  }

  /**
   * 获取
   */
  getStorage(key: string) {
    const val: string = window.localStorage.getItem(key) || "";
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  }

  /**
   * 删除， 如果不传值，删除所有
   */
  clearStorage(key: string) {
    if (key) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.clear();
    }
  }

  /**
   * 保存为文件，下载文件
   */
  saveShareContent(content: any, fileName: string) {
    const downLink = document.createElement("a");
    downLink.download = fileName;
    // 字符内容转换为blod地址
    const blob = new Blob([content]);
    downLink.href = URL.createObjectURL(blob);
    // 链接插入到页面
    document.body.appendChild(downLink);
    downLink.click();
    // 移除下载链接
    document.body.removeChild(downLink);
  }
}
export default new Util();
