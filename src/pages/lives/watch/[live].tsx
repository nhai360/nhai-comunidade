"use client";
import styles from "./index.module.scss";

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/router";
import { useUser } from "@/client/users";
import { useAuthContext } from "@/contexts";
import { useLive } from "@/client/lives";
import LiveNotFound from "@/features/lives/LiveNotFound";
import { Levels } from "react-activity";
import MuxVideo from "@mux/mux-video-react";
import { WatchChat } from "@/components/WatchChat";

const WatchLive = (): JSX.Element => {
  const router = useRouter();

  const liveId = router?.query?.live;

  const { live, isLoading } = useLive({ liveId: liveId as string });

  const { session } = useAuthContext();
  const { user } = useUser({
    id: session?.userId,
  });

  return !!live?.spaceId && !isLoading && user && live?.playbackId ? (
    <div className={styles.main}>
      <div className={styles.videoContainer}>
        <MuxVideo
          playbackId={live?.playbackId}
          streamType="live"
          metadata={{
            video_id: live?.playbackId,
            video_title: live?.title,
            viewer_user_id: session?.userId,
          }}
          title={live?.title}
          controls
          width={"100%"}
          height={"100%"}
          style={{ backgroundColor: "#323232" }}
        />
      </div>

      <WatchChat user={user} liveId={live?.id} />
    </div>
  ) : isLoading ? (
    <div className={styles.spaceGreetings}>
      <Levels color={"#f23d80"} size={32} />
    </div>
  ) : (
    <LiveNotFound />
  );
};

export default WatchLive;
