import React from "react";

import styles from "./styles.module.scss";
import { CaretLeft } from "@phosphor-icons/react";

const BtnGoBack = () => {
  return (
    <>
      <div className={styles.btnGoBack}>
        <CaretLeft size={20} />
      </div>
    </>
  );
};

export default BtnGoBack;
