"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";
import { BiStation } from "react-icons/bi";
import { useSpace } from "@/hooks/useSpace";
import { Live } from "@/client/lives";
import { useBroadcastLive } from "@/client/lives/useBroadcastLive";
import { toast } from "react-toastify";

interface Props {
  live: Live;
}

const BroadcastButton = ({ live }: Props) => {
  const { isBroadcasting } = useSpace();
  const {
    start: { startBroadcast, isLoading: isStarting, isError: isStartError },
    stop: { stopBroadcast, isLoading: isStoping, isError: isStopError },
  } = useBroadcastLive();

  const params = {
    spaceId: live?.spaceId,
    broadcastId: live?.broadcastId,
    liveId: live?.id,
  };

  const handleBroadcast = () => {
    if (params?.spaceId && params?.liveId && params?.broadcastId) {
      if (isBroadcasting) {
        stopBroadcast(params as any, {
          onSuccess: () => {
            toast.success("A transmissão iniciou!");
          },
          onError: () => {
            toast.error("Falha iniciar a transmissão. Tente novamente");
          },
        });
      } else {
        startBroadcast(params as any, {
          onSuccess: () => {
            toast.success("A transmissão iniciou!");
          },
          onError: () => {
            toast.error("Falha iniciar a transmissão. Tente novamente");
          },
        });
      }
    } else {
      toast.error("Falha iniciar a transmissão. Tente novamente");
    }
  };

  return (
    <>
      <button onClick={handleBroadcast} className={styles.buttonBroadcast}>
        {isBroadcasting && (
          <>
            {" "}
            <div className={styles.broadcastButtonTextMobile}>
              <div className={styles.cancelDot}>
                <BiStation size="1.8em" style={{ color: "#F97D7D" }} />
                <span className={styles.line}></span>
              </div>
              <span
                className={styles.endBroadcast}
                style={{ color: "#F97D7D" }}
              >
                Parar Live
              </span>
            </div>
            <div className={styles.broadcastButtonText}>
              <div className={styles.cancelDot}>
                <BiStation size="1.8em" style={{ color: "#F97D7D" }} />
                <span className={styles.line}></span>
              </div>
              <span
                className={styles.endBroadcast}
                style={{ color: "#F97D7D" }}
              >
                Encerrar transmissão
              </span>
            </div>
          </>
        )}
        {!isBroadcasting && (
          <>
            {" "}
            <div className={styles.broadcastButtonTextMobile}>
              <BiStation size="1.8em" />
              <span className={styles.startBroadcast}>Iniciar Live</span>
            </div>
            <div className={styles.broadcastButtonText}>
              <BiStation size="1.8em" />
              <span className={styles.startBroadcast}>Iniciar transmissão</span>
            </div>
          </>
        )}
      </button>
    </>
  );
};

export default BroadcastButton;
