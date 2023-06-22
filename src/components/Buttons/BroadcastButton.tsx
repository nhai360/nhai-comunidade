"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { BiStation } from "react-icons/bi";
import { useSpace } from "@/hooks/useSpace";
import { Live } from "@/client/lives";
import { useBroadcastLive } from "@/client/lives/useBroadcastLive";
import { toast } from "react-toastify";
import { Loading } from "@/ui";

interface Props {
  live: Live;
}

const BroadcastButton = ({ live }: Props) => {
  const { isBroadcasting } = useSpace();
  const {
    start: { startBroadcast, isLoading: isStarting },
    stop: { stopBroadcast, isLoading: isStoping },
  } = useBroadcastLive();

  const status = live?.status;

  const [canClick, setCanClick] = useState<"START" | "STOP" | "">("");

  const loading = !!canClick || isStarting || isStoping;

  const params = {
    spaceId: live?.spaceId,
    broadcastId: live?.broadcastId,
    liveId: live?.id,
  };

  const handleBroadcast = () => {
    if (status === "FINISHED") {
      toast?.error("Essa live já foi encerrada!");
      return;
    }
    if (params?.spaceId && params?.liveId && params?.broadcastId && !loading) {
      if (isBroadcasting) {
        setCanClick("STOP");
        stopBroadcast(params as any, {
          onSuccess: () => {
            toast.success("A transmissão iniciou!");
          },
          onError: () => {
            setCanClick("");
            toast.error("Falha iniciar a transmissão. Tente novamente");
          },
        });
      } else {
        setCanClick("START");
        startBroadcast(params as any, {
          onSuccess: () => {
            toast.success("A transmissão iniciou!");
          },
          onError: () => {
            setCanClick("");
            toast.error("Falha iniciar a transmissão. Tente novamente");
          },
        });
      }
    } else {
      toast.error("Falha iniciar a transmissão. Tente novamente");
    }
  };

  useEffect(() => {
    if (
      (canClick === "START" && isBroadcasting) ||
      (canClick === "STOP" && !isBroadcasting)
    ) {
      setCanClick("");
    }
  }, [isBroadcasting]);

  return (
    <>
      <button
        onClick={handleBroadcast}
        disabled={loading}
        className={styles.buttonBroadcast}
      >
        {loading ? (
          <Loading />
        ) : isBroadcasting ? (
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
        ) : (
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
