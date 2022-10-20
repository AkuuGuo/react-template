import { AxiosError, AxiosRequestConfig } from "axios";
import { map, get, includes } from "lodash";
import { RequestPayload, Result } from ".";
import { ErrorCode, SUCCEED, baseURL } from "../constants";
import buildHeader from "./buildHeader";

// 是否特殊body
export const isSpecialBody = (body: any) => {
  const specialBodyList = [
    "[object FormData]",
    "[object File]",
    "[object Blob]",
  ];
  const prototypeStr = Object.prototype.toString.call(body);
  if (includes(specialBodyList, prototypeStr)) {
    return true;
  }
  return false;
};

// 处理get请求地址栏拼接
export function encodeURLBody(body: any): string {
  if (!body) return "";

  const keys = Object.keys(body);
  const urlParam = map(keys, (key) => `${key}=${body[key]}`).join("&");
  return urlParam;
}

// 组装config
export function assembleConfig(payload: RequestPayload): AxiosRequestConfig {
  const { path, method, body } = payload;

  // 请根据业务要求实现generateHeader函数
  const requestHeader = buildHeader(payload);

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  let url = path;
  let requestBody = null;
  if (body) {
    if (method && method.toLowerCase() === "get") {
      const params = `?${encodeURLBody(body)}`;
      url = url.concat(params);
    } else if (isSpecialBody(body)) {
      requestBody = body;
    } else {
      requestBody = JSON.stringify(body);
    }
  }

  return {
    method: method || "post",
    baseURL: baseURL,
    url,
    headers: {
      Accept: "application/json",
      ...requestHeader,
    },
    data: requestBody,
  };
}

export function processErrMsg(err: AxiosError): string {
  let message = "连接服务器失败!";
  // 当响应异常时做一些处理
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        message = "请求错误(400)";
        break;
      case 401:
        message = "未授权，请重新登录(401)";
        break;
      case 403:
        message = "拒绝访问(403)";
        break;
      case 404:
        message = "请求出错(404)";
        break;
      case 408:
        message = "请求超时(408)";
        break;
      case 500:
        message = "服务器错误(500)";
        break;
      case 501:
        message = "服务未实现(501)";
        break;
      case 502:
        message = "网络错误(502)";
        break;
      case 503:
        message = "服务不可用(503)";
        break;
      case 504:
        message = "网络超时(504)";
        break;
      case 505:
        message = "HTTP版本不受支持(505)";
        break;
      default:
        message = `连接出错(${err.response.status})!`;
    }
  }

  return message;
}

export function parseResponse(responseBody: any): Result {
  const code = get(responseBody, "code", ErrorCode.BACKEND_CONTENT_INVALID); // 表示后端未按标准应答格式返回
  if (code !== SUCCEED) {
    const message = get(responseBody, "message", "请求失败");
    return {
      error: {
        code,
        message,
      },
    };
  }
  const data = get(responseBody, "data", {});
  return { data };
}
