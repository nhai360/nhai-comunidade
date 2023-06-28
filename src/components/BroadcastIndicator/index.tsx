import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useInterval } from "usehooks-ts";
import axios from "axios";
import { Eye, ChatTeardropText } from "@phosphor-icons/react";
import { Tooltip } from "@/ui";

interface IBroadcastIndicator {
  isOnline: boolean;
  playbackId: string;
  qntMessages?: number;
}

const BroadcastIndicator = ({
  isOnline,
  playbackId,
  qntMessages = 0,
}: IBroadcastIndicator) => {
  const [viewers, setViewers] = useState(0);

  const handleGetViewers = async () => {
    axios
      .post(`/api/stats`, { playbackId })
      .then(({ data }) => setViewers(data.data[0]?.viewers));
  };
  useInterval(
    () => {
      handleGetViewers();
    },
    20000 // interval is every 15 seconds (recommended to be 15-30 seconds depending on video length)
  );

  return (
    <>
      <div style={{ display: "flex", gap: 4 }}>
        <div className={styles.broadcastIndicator}>
          {!isOnline ? (
            <>
              <span className={styles.offlineDot}></span>
              <span>OFFLINE</span>
            </>
          ) : (
            <>
              <span className={styles.onlineDot}></span>
              <span>AO VIVO</span>
            </>
          )}
        </div>
        <Tooltip message="Pessoas assistindo" position="top">
          <div className={styles.broadcastIndicator} style={{ gap: 4 }}>
            <Eye size={18} />
            <span>{viewers || 0} </span>
          </div>
        </Tooltip>
        <Tooltip message="Pessoas assistindo" position="top">
          <div className={styles.broadcastIndicator} style={{ gap: 4 }}>
            <ChatTeardropText size={18} />
            <span>{qntMessages} </span>
          </div>
        </Tooltip>
      </div>
    </>
  );
};

export default BroadcastIndicator;
