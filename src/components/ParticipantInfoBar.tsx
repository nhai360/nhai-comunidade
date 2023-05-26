import React from "react";

import MuteIndicator from "./MuteIndicator";

interface Props {
  name: string;
  isMuted: boolean;
  parentHeight: number;
}

export default function ParticipantInfoBar({
  name,
  isMuted,
  parentHeight,
}: Props): JSX.Element {
  let height = "40px";
  let fontSize = "14px";
  if (parentHeight <= 250) {
    height = "30px";
  }
  if (parentHeight <= 200) {
    height = "20px";
    fontSize = "10px";
  }
  if (parentHeight <= 90) {
    height = "15px";
    fontSize = "10px";
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: "0",
        left: "0",
        width: "100%",
        height: height,
        color: "transparent",
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MuteIndicator parentHeight={parentHeight} isMuted={isMuted} />
      <div style={{ fontSize: fontSize, fontWeight: "700" }}>
        {name}
      </div>
    </div>
  );
}