"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";
import { BiUserPlus } from "react-icons/bi";

interface Props {
  guests: any[];
}

const InviteParticipantButton = ({ guests }: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        id={styles.ScreenSharing}
        className={styles.buttonWrapper}
        style={{
          backgroundColor: "#fff",
          borderColor: "#b6b6b6",
        }}
      >
        <div className={styles.tooltip}>
          {guests?.length >= 5
            ? "Limite de convidados atingido"
            : "Convidar participante"}
        </div>
        <BiUserPlus size="1.8em" />
      </button>
    </>
  );
};

export default InviteParticipantButton;
