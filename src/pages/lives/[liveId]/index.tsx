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

const headerHeight = 80;
const chatWidth = 300;

interface Props {
  heliosURL: string;
  spaceBackendURL: string;
  title: string;
  endsAt?: number;
}

const Home = ({
  heliosURL,
  spaceBackendURL,
  title,
  endsAt,
}: Props): JSX.Element => {
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

  useEffect(() => {
    setCanJoinSpace((endsAt && moment(endsAt).diff(moment()) > 0) || !endsAt);
  }, [endsAt]);

  useEffect(() => {
    if (spaceBackendURL) {
      (window as any).MUX_SPACES_BACKEND_URL = spaceBackendURL;
    }
    if (heliosURL) {
      (window as any).MUX_SPACES_HELIOS_URL = heliosURL;
    }
  }, [spaceBackendURL, heliosURL]);

  const mutation = useMutation(tokenPOST, {
    onSuccess: async (data) => {
      await joinSpace(data.spaceJWT, endsAt, user?.fullName);
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
      authenticate(live?.spaceId, `${user?.fullName}|${user?.id}`);
    }
  }, [live?.spaceId, canJoinSpace, authenticate, user?.id]);

  const handleSubmit = async () => {
    participant.setParticipantName(user?.fullName || "");
    participant.setInteractionRequired(false);
    handleJoin();
  };

  useEffect(() => {
    if (!isRouterReady) return;
    if (!isLoading && !live?.spaceId) {
      console.warn("No space selected");
      return;
    }
    router.events.on("routeChangeStart", leaveSpace);
    router.events.on("routeChangeComplete", handleJoin);
    return () => {
      router.events.off("routeChangeStart", leaveSpace);
      router.events.off("routeChangeComplete", handleJoin);
    };
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
          <BroadcastIndicator isOnline={isBroadcasting} />
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
            width={galleryWidth}
            height={galleryHeight}
            participantsPerPage={participantsPerPage}
          />
        </div>
        <Chat messages={[]} isOpen={width > 800} />
      </div>
      <div className={styles.toolbarWrapper}>
        <div className={styles.indicatorDot}>
          <BroadcastIndicator isOnline={isBroadcasting} />
        </div>

        <div className={styles.mainTools}>
          <InviteParticipantButton guests={live?.guests || []} />
          <CameraButton />
          <MicButton />
          <BroadcastButton live={live} />
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

export default Home;

const { MUX_SPACES_BACKEND_URL = "", MUX_SPACES_HELIOS_URL = "" } = process.env;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { liveId } = context.query;
  let passthrough;
  let createdAt;

  try {
    if (typeof liveId === "string") {
      ({ passthrough, created_at: createdAt } = await fetchSpace(liveId));
    }
  } catch (error) {}

  let props: Record<string, any> = {
    heliosURL: MUX_SPACES_HELIOS_URL,
    spaceBackendURL: MUX_SPACES_BACKEND_URL,
    title: passthrough ? `${passthrough} | Mux Meet` : "Mux Meet Space",
  };

  if (
    process.env.SPACE_DURATION_SECONDS &&
    passthrough === TEMPORARY_SPACE_PASSTHROUGH &&
    createdAt
  ) {
    props.endsAt = moment(createdAt * 1000)
      .add(process.env.SPACE_DURATION_SECONDS, "seconds")
      .valueOf();
  }

  return {
    props,
  };
};
