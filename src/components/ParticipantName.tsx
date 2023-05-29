import { memo } from "react";

interface Props {
  isSmall: boolean;
  children: string;
}

function ParticipantName({ isSmall, children }: Props): JSX.Element {
  return (
    <div
      style={{
        background: "black",
        color: "white",
        fontSize: isSmall ? "20px" : "45px",
        height: "100%",
        
        position: "absolute",
        top: "0",
        width: "100%",
      }}
    >
      <div style={{ width: "100%",height:"100%", justifyContent: "flex-start", paddingTop:"30px",pointerEvents: "none", display: "flex", flexDirection: "column", textAlign: "center" }}>
        <div style={{ overflowWrap: "anywhere" }}>{children}</div>
      </div>
    </div>
  );
}

const MemoizedName = memo(ParticipantName);
export default MemoizedName;