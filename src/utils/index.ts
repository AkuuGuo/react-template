// 判断是否JSON格式字符串
export function getJSONType(str: string): boolean {
  let result = false;
  str = str.trim();
  if ((str.startsWith("{") && str.endsWith("}")) || (str.startsWith("[") && str.endsWith("]"))) {
    result = true;
  }
  return result;
}

// 存储Storage
export function setStorage(key: string, value: any, isLocal = false): void {
  if (!key || typeof key !== "string") {
    console.log("传参错误：缺少必要参数key或key数据类型不为string");
    return;
  }

  if (typeof value !== "string") {
    try {
      value = JSON.stringify(value);
    } catch (error) {
      console.log("JSON.stringify Error：", error);
    }
  }

  const storage = isLocal ? localStorage : sessionStorage;
  storage.setItem(key, value);
}

// 获取Storage
export function getStorage(key: string, defaultVal = {}, isLocal = false): any {
  if (!key || typeof key !== "string") {
    console.log("传参错误：缺少必要参数key或key数据类型不为string");
    return;
  }

  const storage = isLocal ? localStorage : sessionStorage;
  const value = storage.getItem(key);

  if (!value) {
    return defaultVal;
  }

  try {
    const data = JSON.parse(value);
    return data;
  } catch (error: unknown) {
    return value;
  }
}

// 删除Storage
export function removeStorage(key: string | string[], isLocal = false): void {
  if (!key) {
    console.log("传参错误：缺少必要参数key");
    return;
  }

  const storage = isLocal ? localStorage : sessionStorage;
  if (Array.isArray(key)) {
    key.forEach((item) => {
      storage.removeItem(item);
    });
    return;
  }
  storage.removeItem(key);
}

// 解析地址栏参数
export function getUrlParams(urlSearch?: string) {
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
}

// base64转blob
export function dataURItoBlob(base64Data: string, type: string = "video/mp4"): Blob {
  const strArr = base64Data.split(",");
  const prefixStr = strArr[0];
  let byteString = "";
  let mimeString = type;
  if (prefixStr.indexOf("base64") >= 0) {
    byteString = strArr[1] || "";
    const prefixStrArr = prefixStr.split(":");
    const mimeStringWithSemicolon = prefixStrArr[1] || "";
    mimeString = mimeStringWithSemicolon.split(";")[0];
  } else {
    byteString = decodeURIComponent(base64Data);
  }

  try {
    byteString = atob(byteString);
  } catch (error) {
    console.log("atob error:", (error as Error).message);
  }

  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob: any = new Blob([ia], { type: mimeString });
  blob.lastModifiedDate = new Date();
  blob.name = "blob";
  return blob;
}

// blob转file
export function blobToFile(blobData: Blob, type = "video/mp4", fileName?: string): File {
  const date = new Date();
  const localDate = date.toISOString().split("T")[0];
  let timeDate = date.toTimeString().split(" ")[0];
  timeDate = timeDate.replace(/:/g, ".");
  const fileType = type.split("/")[1] || "";
  const _fileName = fileName || `${localDate}T${timeDate}.${fileType}`;
  const file = new File([blobData], _fileName, { type });
  return file;
}

// base64转file
export function base64ToFile(base64Url: string, type = "video/mp4", fileName?: string): File {
  const blob = dataURItoBlob(base64Url, type);
  const file = blobToFile(blob, type, fileName);
  return file;
}
