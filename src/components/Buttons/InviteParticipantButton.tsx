"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";
import { BiUserPlus } from "react-icons/bi";
import { InviteParticipantDialog } from "@/features/lives/InviteParticipantDialog";

interface Props {
  guests: any[];
  spaceId: string;
  liveId: string;
}

const InviteParticipantButton = ({ guests, spaceId, liveId }: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        disabled={guests?.length >= 5 && true}
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

      {showModal && (
        <InviteParticipantDialog
          guests={guests}
          spaceId={spaceId}
          liveId={liveId}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default InviteParticipantButton;
