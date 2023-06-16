import { useContext } from "react";

import ParticipantMediaContext from "../contexts/ParticipantMedia";

interface ParticipantMedia {
  participantMediaError?: string;
  requestPermissionAndPopulateDevices: () => void;
  requestPermissionAndStartDevices: (
    microphoneDeviceId?: string,
    cameraDeviceId?: string
  ) => Promise<void>;

  cameraDevices: MediaDeviceInfo[];
  activeCameraId?: string;
  stopActiveCamera: () => void;
  changeActiveCamera: (deviceId: string) => Promise<void>;

  microphoneDevices: MediaDeviceInfo[];
  activeMicrophoneId?: string;
  muteActiveMicrophone: () => void;
  unMuteActiveMicrophone: () => void;
  changeActiveMicrophone: (deviceId: string) => Promise<void>;
  getActiveMicrophoneLevel: () => {
    avgDb: number;
    peakDb: number;
  } | null;
}

export function useParticipantMedia(): ParticipantMedia {
  const {
    participantMediaError,
    requestPermissionAndPopulateDevices,
    requestPermissionAndStartDevices,

    cameraDevices,
    activeCameraId,
    stopActiveCamera,
    changeActiveCamera,

    microphoneDevices,
    activeMicrophoneId,
    muteActiveMicrophone,
    unMuteActiveMicrophone,
    changeActiveMicrophone,
    getActiveMicrophoneLevel,
  } = useContext(ParticipantMediaContext);

  return {
    participantMediaError,
    requestPermissionAndPopulateDevices,
    requestPermissionAndStartDevices,

    cameraDevices,
    activeCameraId,
    stopActiveCamera,
    changeActiveCamera,

    microphoneDevices,
    activeMicrophoneId,
    muteActiveMicrophone,
    unMuteActiveMicrophone,
    changeActiveMicrophone,
    getActiveMicrophoneLevel,
  };
}
