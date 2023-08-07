"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import BroadcastIndicator from "@/components/BroadcastIndicator";
import Chat from "@/components/ChatComponent";
import MicButton from "@/components/Buttons/MicButton";
import ScreenShareButton from "@/components/Buttons/ScreenShareButton";
import CameraButton from "@/components/Buttons/CameraButton";
import BroadcastButton from "@/components/Buttons/BroadcastButton";

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useSpace } from "../../../hooks/useSpace";
import useWindowDimensions from "../../../hooks/useWindowDimension";

import Gallery from "@/components/Gallery";
import Timer from "@/components/Timer/Timer";
import ChatContext from "../../../contexts/Chat";
import CancelButton from "@/components/Buttons/CancelButton";
import { useRouter } from "next/router";
import moment from "moment";
import { useMutation } from "react-query";
import { GetServerSideProps } from "next";
import { tokenPOST } from "@/client/token";
import { fetchSpace } from "@/pages/api/spaces/[id]";
import { TEMPORARY_SPACE_PASSTHROUGH } from "@/lib/constants";
import { useUser } from "@/client/users";
import { useAuthContext } from "@/contexts";
import ParticipantContext from "@/contexts/Participant";
import InviteParticipantButton from "@/components/Buttons/InviteParticipantButton";
import { useLive } from "@/client/lives";

import { Button } from "@/ui";
import { Broadcast } from "@phosphor-icons/react";
import { Levels } from "react-activity";
import JoinLive from "@/features/lives/JoinLive";
import LiveNotFound from "@/features/lives/LiveNotFound";
import { toast } from "react-toastify";
import { handleGetChat } from "@/services/firebase/chat";
import { withAuth } from "@/middlewares";

const headerHeight = 80;
const chatWidth = 300;

const Home = (): JSX.Element => {
  const router = useRouter();

  const liveId = router?.query?.liveId;

  const { live, isLoading } = useLive({ liveId: liveId as string });

  const { session } = useAuthContext();

  const userIsParticipant =
    !isLoading && live?.guests?.find((g) => g?.guest?.id === session?.userId);

  const participant = useContext(ParticipantContext);

  const { user } = useUser({
    id: session?.userId,
  });

  const userIsAuthor = live?.author?.id === session?.userId;

  const isAdmin = user?.role?.name === "ADMIN";

  let gap = 10;

  const {
    participantCount,
    isScreenShareActive,
    isBroadcasting,
    spaceEndsAt,
    isJoined,
    joinSpace,
    leaveSpace,
  } = useSpace();

  const { isReady: isRouterReady } = router;
  const [canJoinSpace, setCanJoinSpace] = useState(true);

  const mutation = useMutation(tokenPOST, {
    onSuccess: async (data) => {
      await joinSpace(data.spaceJWT, undefined, user?.fullName);
    },
    onError: (e) => {
      toast.error("Não foi possível entrar no espaço :(");
      participant.setInteractionRequired(true);
    },
  });

  const authenticate = useCallback(
    (spaceId: string, participantId: string) => {
      mutation.mutate({
        spaceId,
        participantId,
      });
    },
    [mutation]
  );

  const handleJoin = useCallback(() => {
    if (typeof live?.spaceId === "string" && canJoinSpace) {
      authenticate(live?.spaceId, `${session?.userId}`);
      participant.setParticipantName(user?.fullName?.split(" ")[0] || "");
      participant.setInteractionRequired(false);
    }
  }, [live?.spaceId, canJoinSpace, authenticate, session?.userId]);

  const handleSubmit = async () => {
    handleJoin();
  };

  useEffect(() => {
    if (!isRouterReady) return;
    if (!isLoading && !live?.spaceId) {
      console.warn("No space selected");
      return;
    } else {
      router.events.on("routeChangeStart", leaveSpace);
      router.events.on("routeChangeComplete", handleJoin);
      return () => {
        router.events.off("routeChangeStart", leaveSpace);
        router.events.off("routeChangeComplete", handleJoin);
      };
    }
  }, [
    live?.spaceId,
    user,
    router,
    handleJoin,
    leaveSpace,
    isRouterReady,
    user?.fullName,
  ]);

  // const { isChatOpen } = useContext(ChatContext);
  const { width = 0, height = 0 } = useWindowDimensions();

  const availableWidth = width - (width > 800 ? chatWidth : 0);

  const paddingY = height < 600 ? 10 : 0;
  const paddingX = availableWidth < 800 ? 40 : 48;

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

  const [chat, setChat] = useState([]);

  useEffect(() => {
    live?.id && handleGetChat(live?.id, setChat);
  }, [live?.id]);

  return !live?.spaceId || !userIsParticipant ? (
    <LiveNotFound />
  ) : participant?.interactionRequired ? (
    <JoinLive handleSubmit={handleSubmit} live={live} />
  ) : isJoined ? (
    <div style={{ overflow: "hidden" }}>
      <div className={styles.header}>
        <Image src="/logo.svg" width="100" height="100" alt="Contaí! Stage" />
        {/* <p>Number of participants: {participantCount || 0}</p> */}
        <div className={styles.indicatorTop}>
          <BroadcastIndicator
            playbackId={`${live?.playbackId}`}
            isOnline={isBroadcasting}
            qntMessages={chat?.length}
          />
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
            live={live}
            gap={gap}
            width={galleryWidth}
            height={galleryHeight}
            participantsPerPage={participantsPerPage}
          />
        </div>
        <Chat
          chat={chat}
          liveId={live?.id}
          isOwner={userIsAuthor || isAdmin}
          isOpen={width > 800}
          user={user as any}
        />
      </div>
      <div className={styles.toolbarWrapper}>
        <div className={styles.indicatorDot}>
          <BroadcastIndicator
            playbackId={`${live?.playbackId}`}
            isOnline={isBroadcasting}
            qntMessages={chat?.length}
          />
        </div>

        <div className={styles.mainTools}>
          {(userIsAuthor || isAdmin) && (
            <InviteParticipantButton
              spaceId={live?.spaceId}
              liveId={live?.id}
              guests={live?.guests || []}
            />
          )}
          <CameraButton />
          <MicButton />
          {(userIsAuthor || isAdmin) && <BroadcastButton live={live} />}
        </div>

        <div className={styles.callOut}>
          <CancelButton />
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className={styles.spaceGreetings}>
        <Levels color={"#f23d80"} size={32} />
      </div>
    </>
  );
};

export default withAuth(Home);
