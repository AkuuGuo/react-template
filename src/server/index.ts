/*
 * @Description: 😊
 * @Author: Gooyh
 * @Date: 2021-12-10 11:08:02
 * @LastEditors: Gooyh
 * @LastEditTime: 2022-05-24 16:58:45
 */
import { call, delay, race } from "@redux-saga/core/effects";
import axios, { AxiosError, AxiosStatic, Method } from "axios";
import { get } from "lodash";
import { assembleConfig, processErrMsg, parseResponse } from "./serverUtils";
import { ErrorCode } from "../constants";
import Toast from "../components/LoadingToast";

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
  header?: Object | any;
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
let serviceCount = 0; // 计算请求数 控制后请求先响应 提前关闭了loading
// 组装请求
function* fetchServerDataSaga(payload: RequestPayload) {
  const {
    showError = true,
    showLoading = true,
    timeout = 60 * 1000,
    callback,
    errCallback,
  } = payload;

  if (showLoading) {
    if (serviceCount === 0) {
      // 在此处开启loading
      Toast.loading("加载中", 0, undefined, true);
    }
    serviceCount++;
  }

  const config = assembleConfig(payload);
  let result: Result = {
    error: undefined,
    data: undefined,
  };
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

  if (showLoading) {
    serviceCount--;
    if (serviceCount === 0) {
      // 在此处关闭loading
      // console.log("所有请求结束关闭loading......");
      showLoading && Toast.hide();
    }
  }

  if (result.error) {
    // 做一些错误处理 弹窗tip
    showError && result.error.message && Toast.fail(result.error.message, 3);
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
