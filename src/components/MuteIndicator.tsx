import React from "react";
import { IoMicOffOutline } from "react-icons/io5";

interface Props {
  isMuted: boolean;
  parentHeight: number;
}

const MuteIndicator = ({ isMuted, parentHeight }: Props): JSX.Element => {
  let left = "2px";
  let bottom = "15%";
  let marginLeft = "3";
  let iconWidth = "5";
  let iconHeight = "5";
  let borderRadius = "10px";
  let paddingX = "2";
  let paddingY = "1";
  if (parentHeight <= 250) {
    left = "0";
    bottom = "5%";
    marginLeft = "1";
  }
  if (parentHeight <= 200) {
    paddingX = "1";
    borderRadius = "0 10px 0 0";
    bottom = "0";
    marginLeft = "0";
    iconWidth = "12px";
    iconHeight = "12px";
  }
  if (parentHeight <= 90) {
    paddingX = "0";
    paddingY = "1.5px";
    borderRadius = "0";
  }

  return (
    <div
      style={{
        background: "rgba(68, 68, 68, 0.75)",
        borderRadius: borderRadius,
        color: "white",
        marginLeft: marginLeft + "px",
        marginTop: "0",
        marginBottom: "0",
        padding: paddingY + "px " + paddingX + "px",
        zIndex: 10,
        position: "absolute",
        left: left,
        bottom: bottom,
      }}
    >
      {isMuted && (
        <div
          style={{ display: "flex", alignItems: "center", color: "#FFFFFF" }}
        >
          <IoMicOffOutline width={iconWidth} height={iconHeight} />
        </div>
      )}
    </div>
  );
};

export default MuteIndicator;
