import React, { useEffect, useMemo } from "react";

import UserContext from "../contexts/Participant";
import { useParticipant } from "../hooks/useParticipant";

import Pin from "./Pin";
import VideoRenderer from "./renderers/VideoRenderer";
import ParticipantInfoBar from "./ParticipantInfoBar";
import ParticipantName from "./ParticipantName";
import { Live } from "@/client/lives";
import { Avatar } from "@/ui";
import { getInitials } from "@/lib/string";

interface Props {
  width?: number;
  height?: number;
  connectionId: string;
  live: Live;
}

export default function Participant({
  width,
  height,
  connectionId,
  live,
}: Props): JSX.Element {
  const {
    id,
    isLocal,
    isSpeaking,
    hasMicTrack,
    isMicTrackMuted,
    isCameraOff,
    cameraWidth,
    cameraHeight,
    attachVideoElement,
  } = useParticipant(connectionId);

  const outlineWidth = 3;

  const participant = live?.guests?.find((a) => a?.guest?.id === id)?.guest;

  const name = participant?.fullName?.split(" ")[0];

  return (
    <div
      style={{
        width: `${width! - outlineWidth * 2}px`,
        height: "100%",
        minWidth: "160px",
        minHeight: "90px",
        background: "black",
        boxShadow: `0 0 0 ${
          !isMicTrackMuted && isSpeaking ? outlineWidth : 1
        }px ${!isMicTrackMuted && isSpeaking ? "#FA50B5" : "black"}`,
        borderRadius: "5px",
        margin: `${outlineWidth}px`,
        overflow: "hidden",
        position: "relative",
      }}
      role="group"
    >
      <VideoRenderer
        local={isLocal}
        width={cameraWidth}
        height={cameraHeight}
        attachFunc={attachVideoElement}
        connectionId={connectionId}
      />

      <ParticipantInfoBar
        name={name || id}
        isMuted={!hasMicTrack || isMicTrackMuted}
        parentHeight={height!}
      />

      {isCameraOff && (
        <>
          <ParticipantName participant={participant} isSmall={width! <= 400}>
            {name || id}
          </ParticipantName>
        </>
      )}

      {!isLocal && <Pin connectionId={connectionId} />}
    </div>
  );
}
