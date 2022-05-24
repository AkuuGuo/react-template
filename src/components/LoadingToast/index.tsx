import classnames from "classnames";
import * as React from "react";
import Notification from "rmc-notification";
import { iconLoading, iconFail, iconSuccess } from "../../assets/images";
import "./styles.scss";

const SHORT = 3;

interface IToastConfig {
  duration: number;
  mask: boolean;
}

const config: IToastConfig = {
  duration: SHORT,
  mask: true,
};

let messageInstance: any;
let messageNeedHide: boolean;
const prefixCls = "my-toast";

function getMessageInstance(
  mask: boolean,
  callback: (notification: any) => void
) {
  (Notification as any).newInstance(
    {
      prefixCls,
      style: {}, // clear rmc-notification default style
      transitionName: "am-fade",
      className: classnames({
        [`${prefixCls}-mask`]: mask,
      }),
    },
    (notification: any) => callback && callback(notification)
  );
}

function notice(
  content: React.ReactNode,
  type: String,
  duration = config.duration,
  onClose: (() => void) | undefined | null,
  mask = config.mask
) {
  messageNeedHide = false;
  getMessageInstance(mask, (notification) => {
    if (!notification) {
      return;
    }

    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }

    if (messageNeedHide) {
      notification.destroy();
      messageNeedHide = false;
      return;
    }

    messageInstance = notification;

    const img =
      type === "loading"
        ? iconLoading
        : type === "success"
        ? iconSuccess
        : iconFail;

    notification.notice({
      duration,
      style: {},
      content: (
        <div className={`${prefixCls}-${type}`}>
          <img src={img} alt="" />
          <div className={`${prefixCls}-text-info`}>{content}</div>
        </div>
      ),
      closable: true,
      onClose() {
        if (onClose) {
          onClose();
        }
        notification.destroy();
        notification = null;
        messageInstance = null;
      },
    });
  });
}

const Toast = {
  loading(
    content: React.ReactNode,
    duration?: number,
    onClose?: () => void,
    mask?: boolean
  ) {
    return notice("", "loading", duration, onClose, mask);
  },
  success(
    content: React.ReactNode,
    duration?: number,
    onClose?: () => void,
    mask?: boolean
  ) {
    return notice(content, "success", duration, onClose, mask);
  },
  fail(
    content: React.ReactNode,
    duration?: number,
    onClose?: () => void,
    mask?: boolean
  ) {
    return notice(content, "fail", duration, onClose, mask);
  },
  hide() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    } else {
      messageNeedHide = true;
    }
  },
};

export default Toast;
