import { memo } from "react";
import { Property } from "csstype";
import { loadingBlue } from "../../assets/images";

interface Props {
  background?: string;
  marginTop?: string;
  position?: Property.Position;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  show?: boolean;
}

const Loading = (props: Props) => {
  const {
    background,
    marginTop,
    position,
    top,
    right,
    bottom,
    left,
    show = true,
  } = props;
  if (!show) {
    return null;
  }

  return (
    <div
      style={{
        background: background || "#F4F4F4",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: position || "static",
        top,
        right,
        bottom,
        left,
      }}
    >
      <div style={{ marginTop: marginTop || "2.4rem" }}>
        <img
          src={loadingBlue}
          alt=""
          style={{
            width: "10%",
            display: "block",
            margin: "0 auto 0.2rem auto",
          }}
        />
        <div
          style={{ fontSize: "0.15rem", color: "#98b8e8", textAlign: "center" }}
        >
          正在加载...
        </div>
      </div>
    </div>
  );
};

export default memo(Loading);
