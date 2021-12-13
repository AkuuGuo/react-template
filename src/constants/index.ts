/*
 * @Description: 😊
 * @Author: Gooyh
 * @Date: 2021-12-10 17:03:33
 * @LastEditors: Gooyh
 * @LastEditTime: 2021-12-13 10:32:18
 */

export const SUCCEED = 0;

// 内部错误码
export enum ErrorCode {
  BACKEND_CONTENT_INVALID = -100, // 后端返回数据异常
  DATA_FORMAT_ERROR = -101, // 数据格式错误
  REQUEST_TIMEOUT = -102, // 请求超时
}

export const REACT_APP_ENV: string = process.env.REACT_APP_ENV || "";

export enum ENV {
  DEV = "dev", // 开发
  TEST = "test", // 测试
  PRO = "pro", // 生产
}

export const baseURL = REACT_APP_ENV === ENV.DEV ? "dev" : "";
