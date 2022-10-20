//只有push才会往历史记录push空记录
import { useEffect } from "react";
import { useHistory } from "react-router";
import { History } from "history";

interface Record {
  pathname: string;
  length: number;
}

function usePopstateListener(
  callback: (history: History, e: any) => void
): void {
  const history = useHistory();

  useEffect(() => {
    const backLJ = (e: any) => {
      if (e.state && e.state.target === "MeanSure") {
        /**
         * 1.点击返回键原生也会go(-1)一次，
         * 如果我们点击返回前是Final的话，那么此时的记录必然是MeanSure
         * 否则，这就是一次误拦截，不需要做特殊处理
         * 2.push后length会正常,但go和goBack length不会变
         * 3.我们的拦截页记录的length为查了空白页之后的length
         */
        callback && callback(history, e);
      }
    };

    window.addEventListener("popstate", backLJ, false);
    if (history.action === "PUSH") {
      window.history.pushState(
        { target: "MeanSure", random: Math.random() },
        ""
      );
      window.history.pushState({ target: "Final", random: Math.random() }, "");

      const records: Record[] = JSON.parse(
        sessionStorage.getItem("HashHistoryRecords") || "[]"
      );
      const lastIndex = records.length - 1;
      if (lastIndex < 0) {
        const record: Record = {
          pathname: history.location.pathname,
          length: window.history.length,
        };
        records.push(record);
      } else {
        records[lastIndex].length = window.history.length;
      }
      sessionStorage.setItem("HashHistoryRecords", JSON.stringify(records));
    }

    return () => {
      window.removeEventListener("popstate", backLJ, false);
    };
  }, [history, callback]);
}

export { usePopstateListener };
