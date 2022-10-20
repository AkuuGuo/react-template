import { RequestPayload } from ".";
import { isSpecialBody } from "./tools";

// 获取用户登录信息设置header
function buildHeader(payload: RequestPayload) {
  const { body, header: payloadHeader = {} } = payload;
  const header: { [key: string]: any } = {
    // 一些参数
  };
  // FormData格式的数据，不添加默认header头
  if (!isSpecialBody(body)) {
    header["Content-Type"] = "application/json";
  }
  Object.assign(header, payloadHeader);

  // 根据具体需求给header添加键值
  // if(some){
  //   header["signature"] = signature;
  //   header["timestamp"] = timestamp;
  //   header["biz_token"] = uuid;
  // }
  return header;
}

export default buildHeader;
