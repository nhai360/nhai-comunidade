"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import ParticipantContext from "@/contexts/Participant";
import { useParticipantMedia } from "@/hooks/useParticipantMedia";
import { useSpace } from "@/hooks/useSpace";

const MicButton = () => {
  const {
    participantWantsMicMuted,
    setParticipantWantsMicMuted,
    setMicrophoneDeviceId,
    microphoneDeviceId,
  } = useContext(ParticipantContext);

  const { isJoined, publishMicrophone } = useSpace();

  const {
    microphoneDevices,
    muteActiveMicrophone,
    unMuteActiveMicrophone,
    getActiveMicrophoneLevel,
  } = useParticipantMedia();

  const toggleMicrophone = useCallback(() => {
    if (participantWantsMicMuted) {
      setParticipantWantsMicMuted(false);
      unMuteActiveMicrophone();
    } else {
      setParticipantWantsMicMuted(true);
      muteActiveMicrophone();
    }
  }, [
    participantWantsMicMuted,
    setParticipantWantsMicMuted,
    muteActiveMicrophone,
    unMuteActiveMicrophone,
  ]);

  const selectAudioDevice = useCallback(
    async (deviceId: string) => {
      setMicrophoneDeviceId(deviceId);
      if (isJoined) {
        publishMicrophone(deviceId);
      }
    },
    [isJoined, setMicrophoneDeviceId, publishMicrophone]
  );

  useEffect(() => {
    microphoneDevices?.length > 0 &&
      !microphoneDeviceId &&
      selectAudioDevice(microphoneDevices[0]?.deviceId);
  }, [microphoneDevices]);

  return (
    <>
      <button onClick={toggleMicrophone} className={styles.buttonWrapper}>
        <div className={styles.tooltip}>
          {participantWantsMicMuted ? "Ligar microfone" : "Desligar microfone"}
        </div>
        {participantWantsMicMuted && (
          <BiMicrophoneOff size="1.8em" style={{ color: "#F97D7D" }} />
        )}
        {!participantWantsMicMuted && <BiMicrophone size="1.8em" />}
      </button>
    </>
  );
};

export default MicButton;
