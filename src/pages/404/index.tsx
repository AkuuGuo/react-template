import { notFound } from "@/assets/images/global";

const NoMatch = () => {
  return (
    <div
      style={{
        background: "#F4F4F4",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div style={{ marginTop: "1.35rem", textAlign: "center" }}>
        <div style={{ width: "100%", height: 0, paddingBottom: "1.9rem" }}>
          <img
            src={notFound}
            alt=""
            style={{
              width: "80%",
              display: "block",
              margin: "auto",
              height: "auto",
            }}
          />
        </div>
        <div style={{ fontSize: "0.15rem", color: "#98b8e8" }}>
          您访问的页面不存在～
        </div>
      </div>
    </div>
  );
};

export default NoMatch;
