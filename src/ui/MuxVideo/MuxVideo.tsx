import { useEffect, useMemo, useRef, useState } from "react";

import BaseVideo, { Props as BaseVideoProps } from "@mux/mux-video-react";
import {
  FrameCorners,
  PauseCircle,
  SkipForward,
  SpeakerSimpleHigh,
  SpeakerSimpleX,
} from "@phosphor-icons/react";

import { Button, ProgressBar, Slider, Tooltip, Typography } from "@/ui";
import {
  CheckIcon,
  EditIcon,
  LinkIcon,
  PlayIcon,
  TrashIcon,
} from "@/ui/_icons";
import { addSeconds, format, startOfDay } from "@/lib/date-fns";

import * as S from "./MuxVideo.styles";
import { useRouter } from "next/router";
import { useDeleteVideo } from "@/client/videos/useDeleteVideo";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const UploadVideoDialog = dynamic(
  () => import("../../features/videos/UploadVideoDialog/UploadVideoDialog"),
  { ssr: false }
);

const ONE_HOUR_IN_SECONDS = 60 * 60;

const ICON_BUTTON_PROPS = {
  icon: true,
  variant: "transparent",
  css: {
    color: "$neutral100 !important",

    "&:hover": {
      color: "$textTitle !important",
    },
  },
} as const;

export function MuxVideo({
  controls = false,
  isCreator = false,
  video,
  isMobile = false,
  ...rest
}: any) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const { deleteVideo } = useDeleteVideo();

  const [isPaused, setIsPaused] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [durationTime, setDurationTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [volume, setVolume] = useState(50);

  const isFinished = currentTime === durationTime;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5;
    }
  }, []);

  function handleCopyVideoUrl() {
    if (isCopied) return;

    navigator.clipboard.writeText(
      `${window.location.origin}/videos/${video?.id}`
    );

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }

  function togglePlayState() {
    if (!videoRef.current) return;

    if (isFinished) {
      setIsPaused(false);

      setCurrentTime(0);
      videoRef.current.currentTime = 0;
      return videoRef.current?.play();
    }

    if (isPaused) {
      setIsPaused(false);

      return videoRef.current?.play();
    }

    setIsPaused(true);

    return videoRef.current?.pause();
  }

  function toggleVolumeState() {
    if (volume === 0) {
      return setVolume(30);
    }

    setVolume(0);
  }

  function skipForward() {
    if (videoRef?.current) {
      setCurrentTime((prevState) => prevState + 2);
      videoRef.current.currentTime += 2;
    }
  }

  function changeVolume(newVolume: number) {
    if (!videoRef.current) return;

    videoRef.current.volume = newVolume / 100;
    setVolume(newVolume);
  }

  function openFullScreen() {
    videoRef.current?.requestFullscreen();
  }

  const baseDate = startOfDay(new Date());

  const durationTimeInSeconds = addSeconds(baseDate, durationTime);
  const durationIsMoreThanHour = durationTime >= ONE_HOUR_IN_SECONDS;

  const durationFormatted = format(
    durationTimeInSeconds,
    durationIsMoreThanHour ? "hh:mm:ss" : "mm:ss"
  );

  const currentTimeInMinutes = addSeconds(baseDate, currentTime);
  const currentTimeIsMoreThanHour = currentTime >= ONE_HOUR_IN_SECONDS;

  const currentTimeFormatted = format(
    currentTimeInMinutes,
    currentTimeIsMoreThanHour ? "hh:mm:ss" : "mm:ss"
  );

  const currentPercentProgress = useMemo(() => {
    return (currentTime / durationTime) * 100;
  }, [currentTime, durationTime]);

  const handleEditVideo = () => setShowEdit(true);

  const handleDeleteVideo = () => {
    video?.id &&
      deleteVideo(
        {
          videoId: video?.id,
        },
        {
          onSuccess: () => {
            toast.success("Vídeo excluído!");
            router?.push("/videos");
          },
          onError: () => {
            toast.error("Não foi possível excluir seu vídeo. Tente novamente.");
          },
        }
      );
  };

  const handleTimeChange = (newTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <>
      {showEdit && (
        <UploadVideoDialog
          video={video as any}
          onClose={() => setShowEdit(false)}
        />
      )}
      <S.Container>
        <BaseVideo
          ref={videoRef}
          controls={controls}
          onTimeUpdate={(event) =>
            setCurrentTime(event.currentTarget.currentTime)
          }
          onDurationChange={(event) =>
            setDurationTime(event.currentTarget.duration)
          }
          onClick={!isMobile ? togglePlayState : openFullScreen}
          className="mux-video"
          envKey={process.env.NEXT_PUBLIC_MUX_ENV_KEY}
          {...rest}
        />
        {!isMobile && (
          <S.ControlsContainer
            style={{ padding: isMobile ? "8px 12px" : "$6" }}
          >
            {!isMobile && (
              <ProgressBar
                currentTime={currentTime}
                durationTime={durationTime}
                onTimeChange={handleTimeChange}
              />
            )}
            <S.Controls>
              <S.ControlsRow style={{ marginTop: isMobile ? 0 : "$3" }}>
                <Button {...ICON_BUTTON_PROPS} onClick={togglePlayState}>
                  {isPaused || isFinished ? (
                    <PlayIcon />
                  ) : (
                    <PauseCircle size={24} />
                  )}
                </Button>
                {!isMobile && (
                  <Button {...ICON_BUTTON_PROPS} onClick={skipForward}>
                    <SkipForward size={20} />
                  </Button>
                )}
                {!isMobile && (
                  <>
                    <S.VolumeContainer>
                      <Tooltip message={`${volume}%`}>
                        <Button
                          {...ICON_BUTTON_PROPS}
                          onClick={toggleVolumeState}
                        >
                          {volume === 0 ? (
                            <SpeakerSimpleX size={20} />
                          ) : (
                            <SpeakerSimpleHigh size={20} />
                          )}
                        </Button>
                      </Tooltip>
                      <Slider
                        max={100}
                        min={0}
                        value={[volume]}
                        onValueChange={([volume]) => changeVolume(volume)}
                      />
                    </S.VolumeContainer>
                    <Typography.Text color="neutral">
                      {currentTimeFormatted} / {durationFormatted}
                    </Typography.Text>
                  </>
                )}
              </S.ControlsRow>
              <S.ControlsRow style={{ marginTop: isMobile ? 0 : "$3" }}>
                {isCreator && !isMobile && (
                  <Button onClick={handleDeleteVideo} {...ICON_BUTTON_PROPS}>
                    <TrashIcon size={24} />
                  </Button>
                )}
                {isCreator && !isMobile && (
                  <Button onClick={handleEditVideo} {...ICON_BUTTON_PROPS}>
                    <EditIcon size={24} />
                  </Button>
                )}
                <Button {...ICON_BUTTON_PROPS} onClick={handleCopyVideoUrl}>
                  {isCopied ? <CheckIcon size={20} /> : <LinkIcon size={24} />}
                </Button>
                <Button {...ICON_BUTTON_PROPS} onClick={openFullScreen}>
                  <FrameCorners size={24} weight="light" />
                </Button>
              </S.ControlsRow>
            </S.Controls>
          </S.ControlsContainer>
        )}
      </S.Container>
    </>
  );
}
