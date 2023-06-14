"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";
import { BiPhoneOff } from "react-icons/bi";
import { useSpace } from "@/hooks/useSpace";
import { useRouter } from "next/router";

const CancelButton = () => {
  const { leaveSpace } = useSpace();
  const router = useRouter();

  const handleBack = () => {
    router.push("/videos");
  };

  const handleLeave = () => {
    leaveSpace();
    handleBack();
  };

  return (
    <>
      <button
        style={{ backgroundColor: "#ff2424", borderColor: "#ff2424" }}
        id={styles.buttonCancel}
        className={styles.buttonWrapper}
        onClick={handleLeave}
      >
        <div className={styles.tooltip}>Sair</div>

        <BiPhoneOff size="1.8em" color="#ffffff" />
      </button>
    </>
  );
};

export default CancelButton;
