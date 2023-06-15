import { getInitials } from "@/lib/string";
import { Avatar } from "@/ui";
import { memo } from "react";

interface Props {
  isSmall: boolean;
  children: string;
  participant: any;
}

function ParticipantName({
  isSmall,
  children,
  participant,
}: Props): JSX.Element {
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
      <div
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          progressBar
          alt={participant?.fullName}
          src={participant?.profilePicture?.url}
          fallback={getInitials(participant?.fullName)}
          size={"xlarge"}
        />
        <div>
          <p style={{ marginTop: 8 }}>{children}</p>
        </div>
      </div>
    </div>
  );
}

const MemoizedName = memo(ParticipantName);
export default MemoizedName;
