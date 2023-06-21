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
import mux from "mux-embed";

const WatchLive = (): JSX.Element => {
  const router = useRouter();
  const videoRef = useRef(null);

  const liveId = router?.query?.live;

  const [loading, setLoading] = useState(true);

  const { live, isLoading, isError } = useLive({ liveId: liveId as string });

  const { session } = useAuthContext();
  const { user } = useUser({
    id: session?.userId,
  });

  useEffect(() => {
    (!!live?.id || isError) && setLoading(false);
  }, [live]);

  useEffect(() => {
    if (videoRef.current) {
      const initTime = mux.utils.now();

      mux.monitor(videoRef.current, {
        debug: false,
        data: {
          env_key: process.env.MUX_ENV_KEY_DATA,
          viewer_user_id: session?.userId, // ex: '12345'
          experiment_name: "", // ex: 'player_test_A'
          sub_property_id: "", // ex: 'cus-1'

          // Player Metadata
          player_name: "live-player", // any arbitrary string you want to use to identify this player
          player_version: "", // ex: '1.0.0'
          player_init_time: initTime,

          // Video Metadata
          video_id: `${live?.playbackId}`,
          video_title: live?.title,
          video_series: "", // ex: 'Weekly Great Videos'
          video_stream_type: "live", // 'live' or 'on-demand'
          video_cdn: "", // ex: 'Fastly', 'Akamai'
        },
      });
    }
  }, [videoRef]);

  return isLoading || loading ? (
    <div className={styles.spaceGreetings}>
      <Levels color={"#f23d80"} size={32} />
    </div>
  ) : !!live?.spaceId && !!user && !!live?.playbackId ? (
    <div className={styles.main}>
      <div className={styles.videoContainer}>
        <MuxVideo
          ref={videoRef}
          playbackId={live?.playbackId}
          streamType="live"
          metadata={{
            video_id: live?.playbackId,
            video_title: live?.title,
            viewer_user_id: session?.userId,
            env_key: process.env.MUX_ENV_KEY_DATA,
          }}
          title={live?.title}
          controls
          width={"100%"}
          height={"100%"}
          style={{ backgroundColor: "#323232" }}
          autoPlay
          muted
        />
      </div>

      <WatchChat live={live} user={user} liveId={live?.id} />
    </div>
  ) : (
    <LiveNotFound />
  );
};

export default WatchLive;
