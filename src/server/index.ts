/*
 * @Description: 😊
 * @Author: Gooyh
 * @Date: 2021-12-10 11:08:02
 * @LastEditors: Gooyh
 * @LastEditTime: 2021-12-13 09:12:44
 */
import { call, delay, race } from "@redux-saga/core/effects";
import axios, { AxiosError, AxiosStatic, Method } from "axios";
import { get } from "lodash";
import { assembleConfig, processErrMsg, parseResponse } from "./serverUtils";
import { ErrorCode } from "../constants";

// 扩展原有模块
declare module "axios" {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
}

export interface RequestPayload {
  path: string;
  method?: Method;
  body?: any;
  headers?: Object | any;
  showLoading?: Boolean;
  showError?: Boolean;
  timeout?: number;
  callback?: { (data: any): void };
  errCallback?: { (err: any): void };
}

export interface Result {
  data?: any;
  code?: number;
  message?: string;
  error?: any;
}

/**
 *
 * @param {boolean} showError 错误弹窗
 * @param {boolean} showLoading 加载loading
 * @param {number} timeout 超时时间
 * @param {function} callback 成功回调
 *
 */
// 组装请求
function* fetchServerDataSaga(payload: RequestPayload) {
  const {
    showError = true,
    showLoading = true,
    timeout = 60 * 1000,
    callback,
    errCallback,
  } = payload;
  const config = assembleConfig(payload);
  let result: Result = {
    error: undefined,
    data: undefined,
  };
  // 显示loading
  showLoading && console.log("Toast加载提示...");
  // break 跳出逻辑
  do {
    let task: {
      io: any;
      timeout: any;
    };

    try {
      task = yield race({
        io: call<AxiosStatic>(axios, config),
        timeout: delay(timeout), // 定制超时
      });
    } catch (error: unknown) {
      console.log("error:", error);
      result.error = {
        code: ErrorCode.BACKEND_CONTENT_INVALID, // 自定义错误码
        message: processErrMsg(error as AxiosError),
      };
      break;
    }

    if (task.timeout) {
      result.error = {
        code: ErrorCode.REQUEST_TIMEOUT,
        message: "请求超时",
      };
      break;
    }

    const responseBody = get(task, ["io", "data"]);
    result = parseResponse(responseBody);
  } while (false);

  // 结束loading
  showLoading && console.log("结束Toast...");
  if (result.error) {
    // 做一些错误处理 弹窗tip
    showError && result.error.message && console.log("error tip...");
    try {
      // 错误回调
      errCallback && errCallback(result.error);
    } catch (error) {
      const { path } = payload;
      console.log(
        "捕获到失败回调业务层崩溃, path:" + path + ", message: " + error
      );
    }
    return result;
  }
  try {
    callback && callback(result);
  } catch (error) {
    const { path } = payload;
    console.log(
      "捕获到成功回调业务层崩溃, path:" + path + ", message: " + error
    );
  }
  return result;
}

export default fetchServerDataSaga;

// const instance = axios.create({
//   baseURL: "https://some-domain.com/api/",
//   timeout: 1000,
//   headers: { "X-Custom-Header": "foobar" },
// });

// // 添加请求拦截器
// instance.interceptors.request.use(
//   function (config) {
//     // 在发送请求之前做些什么
//     return config;
//   },
//   function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   }
// );

// // 添加响应拦截器
// instance.interceptors.response.use(
//   function (response) {
//     // 对响应数据做点什么
//     return response;
//   },
//   function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   }
// );
