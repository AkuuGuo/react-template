// 判断是否JSON格式字符串
const getJSONType = (str: string): boolean => {
  let result = false;
  str = str.trim();
  if (
    (str.startsWith("{") && str.endsWith("}")) ||
    (str.startsWith("[") && str.endsWith("]"))
  ) {
    result = true;
  }
  return result;
};

// 存储SessionStorage
export const setSessionStorage = (key: string, value: any) => {
  if (!key || typeof key !== "string") {
    console.log("传参错误：缺少必要参数key或key数据类型不为string");
    return;
  }
  const stringifyType = ["[object Object]", "[object Array]"];
  const valueType = Object.prototype.toString.call(value);
  if (stringifyType.includes(valueType)) {
    try {
      value = JSON.stringify(value);
    } catch (error) {
      console.log("JSON.stringify Error：", error);
    }
  }
  sessionStorage.setItem(key, value);
};

// 获取SessionStorage
export const getSessionStorage = (key: string, defaultVal = {}): any => {
  if (!key || typeof key !== "string") {
    console.log("传参错误：缺少必要参数key或key数据类型不为string");
    return;
  }
  const value = sessionStorage.getItem(key) || "";
  const isJSONType = getJSONType(value);

  if (isJSONType) {
    try {
      const data = JSON.parse(value);
      return data;
    } catch (error: unknown) {
      console.log("JSON.parse Error：", error);
      return value;
    }
  }
  return value || defaultVal;
};

// 删除SessionStorage
export const removeSessionStorage = (key: string | string[]): void => {
  if (!key) {
    console.log("传参错误：缺少必要参数key");
    return;
  }
  if (Array.isArray(key)) {
    key.forEach((item) => {
      sessionStorage.removeItem(item);
    });
    return;
  }
  sessionStorage.removeItem(key);
};

// 解析地址栏参数
export const getUrlParams = (urlSearch?: string) => {
  let searchStr;
  if (typeof urlSearch === "undefined") {
    searchStr = window.location.href.split("?")[1] || ""; // 获取url中"?"符后的字符串
  } else {
    const urlSearchArr = urlSearch.split("?");
    searchStr = urlSearchArr[1] || urlSearchArr[0] || "";
  }

  const paramsObj: any = {};
  const searchArr = searchStr.split("&");
  searchArr.forEach((item) => {
    if (!item || !item.includes("=")) return;

    const keyVal = item.split("=");
    const key = keyVal[0];
    // 没有key 跳过
    if (!key) return;

    const value = keyVal[1];
    paramsObj[key] = decodeURIComponent(value);
  });
  return paramsObj;
};
