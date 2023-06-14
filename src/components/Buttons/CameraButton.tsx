"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { BiCamera, BiCameraOff } from "react-icons/bi";
import { useParticipantMedia } from "@/hooks/useParticipantMedia";
import { useSpace } from "@/hooks/useSpace";
import ParticipantContext from "@/contexts/Participant";

const CameraButton = () => {
  const { cameraOff, setCameraOff, cameraDeviceId, setCameraDeviceId } =
    useContext(ParticipantContext);
  const { isJoined, publishCamera, unPublishDevice } = useSpace();
  const { cameraDevices, stopActiveCamera } = useParticipantMedia();

  const selectCameraDevice = useCallback(
    async (deviceId: string) => {
      setCameraDeviceId(deviceId);

      if (isJoined && !cameraOff) {
        publishCamera(deviceId);
      }
    },
    [isJoined, setCameraDeviceId, cameraOff, publishCamera]
  );

  const toggleCamera = useCallback(async () => {
    if (cameraOff) {
      setCameraOff(false);
      if (isJoined) {
        publishCamera(cameraDeviceId);
      }
    } else {
      setCameraOff(true);
      stopActiveCamera();
      if (isJoined) {
        unPublishDevice(cameraDeviceId);
      }
    }
  }, [
    isJoined,
    cameraOff,
    setCameraOff,
    cameraDeviceId,
    stopActiveCamera,
    publishCamera,
    unPublishDevice,
  ]);

  useEffect(() => {
    cameraDevices?.length > 0 &&
      !cameraDeviceId &&
      selectCameraDevice(cameraDevices[0]?.deviceId);
  }, [cameraOff]);

  return (
    <>
      <button onClick={toggleCamera} className={styles.buttonWrapper}>
        <div className={styles.tooltip}>
          {!cameraOff ? "Desligar câmera" : "Ligar câmera"}
        </div>
        {!cameraOff && <BiCamera size="1.8em" />}
        {cameraOff && <BiCameraOff size="1.8em" style={{ color: "#F97D7D" }} />}
      </button>
    </>
  );
};

export default CameraButton;
