"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import BroadcastIndicator from "@/components/BroadcastIndicator";
import Chat from "@/components/ChatComponent";
import MicButton from "@/components/Buttons/MicButton";
import ScreenShareButton from "@/components/Buttons/ScreenShareButton";
import CameraButton from "@/components/Buttons/CameraButton";
import BroadcastButton from "@/components/Buttons/BroadcastButton";

import React, { useContext, useState } from "react";

import { useSpace } from "../../hooks/useSpace";
import useWindowDimensions from "../../hooks/useWindowDimension";

import Gallery from "@/components/Gallery";
import Timer from "@/components/Timer/Timer";
import ScreenShareRenderer from "@/components/renderers/ScreenShareRenderer";
import ChatContext from "../../contexts/Chat";
import CancelButton from "@/components/Buttons/CancelButton";

const headerHeight = 80;
const chatWidth = 300;
const Home = (): JSX.Element => {
  let gap = 10;

  // AJUSTAR ISSO DEPOIS QUE FAZER A INTEGRAÇÃO
  // const {
  //   participantCount,
  //   attachScreenShare,
  //   isScreenShareActive,
  //   spaceEndsAt,
  // } = useSpace();

  //Excluir useStates abaixo quando forem integrar
  const [participantCount, setParticipantCount] = useState(2);
  const [attachScreenShare, setAttachScreenShare] = useState(null);
  const [isScreenShareActive, setIsScreenShareActive] = useState(false);
  const [spaceEndsAt, setSpaceEndsAt] = useState(null);

  const { isChatOpen } = useContext(ChatContext);
  const { width = 0, height = 0 } = useWindowDimensions();

  const availableWidth = width - (isChatOpen && width > 800 ? chatWidth : 0);

  const paddingY = height < 600 ? 10 : 40;
  const paddingX = availableWidth < 800 ? 40 : 60;

  let galleryWidth = availableWidth - paddingX * 2;
  if (isScreenShareActive) {
    if (participantCount < 6) {
      galleryWidth = availableWidth * 0.25 - paddingX;
    } else {
      galleryWidth = availableWidth * 0.33 - paddingX / 2;
    }
    galleryWidth = Math.max(galleryWidth, 160);
  }
  let galleryHeight = height - headerHeight - paddingY * 2;

  let screenShareWidth = isScreenShareActive
    ? availableWidth - galleryWidth
    : 0;

  let direction: "row" | "column" = "row";
  if (width < height) {
    gap = 8;
    galleryWidth = availableWidth - paddingX * 2;
    if (isScreenShareActive) {
      direction = "column";
      screenShareWidth = availableWidth;
      galleryHeight = height - headerHeight - (availableWidth / 4) * 3;
    }
  }

  let scaleFactor = 2.25;
  const rows = Math.max(Math.ceil(galleryHeight / (90 * scaleFactor)), 1);
  const columns = Math.max(Math.ceil(galleryWidth / (160 * scaleFactor)), 1);

  const participantsPerPage = Math.round(rows * columns);

  return (
    <>
      <div className={styles.header}>
        <Image src="/logo.svg" width="100" height="100" alt="Contaí! Stage" />

        <div className={styles.indicatorTop}>
          <BroadcastIndicator isOnline={false} />
        </div>
      </div>

      <div className={styles.liveWrapper}>
        {spaceEndsAt && <Timer />}
        <div
          style={{
            maxWidth: availableWidth,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: direction,
            flexGrow: 1,
          }}
        >
          <Gallery
            gap={gap}
            // width={galleryWidth}
            // height={galleryHeight}
            participantsPerPage={participantsPerPage}
          />
        </div>

        <Chat messages={[]} isOpen={width > 800 && isChatOpen} />
      </div>
      <div className={styles.toolbarWrapper}>
        <div className={styles.indicatorDot}>
          <BroadcastIndicator isOnline={false} />
        </div>

        <div className={styles.mainTools}>
          <CameraButton />
          {/* <ScreenShareButton /> */}
          <MicButton />
          <BroadcastButton />
        </div>

        <div className={styles.callOut}>
          <CancelButton />
        </div>
      </div>
    </>
  );
};

export default Home;
