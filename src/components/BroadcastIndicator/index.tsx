import React, { useEffect } from "react";
import styles from "./index.module.scss";

interface IBroadcastIndicator {
  isOnline: boolean;
}

const BroadcastIndicator = ({ isOnline }: IBroadcastIndicator) => {
  return (
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
  );
};

export default BroadcastIndicator;
