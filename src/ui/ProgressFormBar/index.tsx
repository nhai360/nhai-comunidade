import React from "react";

import styles from "./styles.module.scss";

interface IProgressFormBar {
  progress: number;
}

const ProgressFormBar = ({ progress }: IProgressFormBar) => {
  return (
    <>
      <div className={styles.container}>
        <div
          style={{ width: `${progress ? `${progress}%` : `0%`}` }}
          className={styles.progressLine}
        ></div>
      </div>
    </>
  );
};

export default ProgressFormBar;
