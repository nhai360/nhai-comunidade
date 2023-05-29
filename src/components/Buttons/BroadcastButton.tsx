"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";
import { BiStation } from "react-icons/bi";

interface Props {}

const BroadcastButton = ({}: Props) => {
  const [isStreaming, setIsStreaming] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsStreaming(!isStreaming)}
        className={styles.buttonBroadcast}
      >
        {isStreaming && (
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
        {!isStreaming && (
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
