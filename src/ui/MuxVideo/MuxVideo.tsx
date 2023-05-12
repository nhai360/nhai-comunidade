import { useMemo, useRef, useState } from "react";

import BaseVideo, { Props as BaseVideoProps } from "@mux/mux-video-react";
import {
  FrameCorners,
  PauseCircle,
  SkipForward,
  SpeakerSimpleHigh,
} from "@phosphor-icons/react";

import { Button, ProgressBar, Typography } from "@/ui";
import { EditIcon, LinkIcon, PlayIcon } from "@/ui/_icons";
import { addSeconds, format, startOfDay } from "@/lib/date-fns";

import * as S from "./MuxVideo.styles";

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
  ...rest
}: Partial<Omit<BaseVideoProps, "ref">>) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPaused, setIsPaused] = useState(true);

  const [durationTime, setDurationTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const isFinished = currentTime === durationTime;

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

  function skipForward() {
    if (videoRef?.current) {
      setCurrentTime((prevState) => prevState + 2);
      videoRef.current.currentTime += 2;
    }
  }

  function openFullScreen() {
    videoRef.current?.requestFullscreen();
  }

  const baseDate = startOfDay(new Date());

  const durationTimeInSeconds = addSeconds(baseDate, durationTime);
  const durationIsMoreThanHour = durationTime >= ONE_HOUR_IN_SECONDS;

  const durationFormatted = format(
    durationTimeInSeconds,
    durationIsMoreThanHour ? "hh:mm:ss" : "mm:ss",
  );

  const currentTimeInMinutes = addSeconds(baseDate, currentTime);
  const currentTimeIsMoreThanHour = currentTime >= ONE_HOUR_IN_SECONDS;

  const currentTimeFormatted = format(
    currentTimeInMinutes,
    currentTimeIsMoreThanHour ? "hh:mm:ss" : "mm:ss",
  );

  const currentPercentProgress = useMemo(() => {
    return (currentTime / durationTime) * 100;
  }, [currentTime, durationTime]);

  return (
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
        onClick={togglePlayState}
        className="mux-video"
        {...rest}
      />
      <S.ControlsContainer>
        <ProgressBar
          currentPercent={currentPercentProgress}
          css={{ background: "$neutral500" }}
        />
        <S.Controls>
          <S.ControlsRow>
            <Button {...ICON_BUTTON_PROPS} onClick={togglePlayState}>
              {isPaused || isFinished ? (
                <PlayIcon />
              ) : (
                <PauseCircle size={24} />
              )}
            </Button>
            <Button {...ICON_BUTTON_PROPS} onClick={skipForward}>
              <SkipForward size={20} />
            </Button>
            <Button {...ICON_BUTTON_PROPS}>
              <SpeakerSimpleHigh size={20} />
            </Button>
            <Typography.Text color="neutral">
              {currentTimeFormatted} / {durationFormatted}
            </Typography.Text>
          </S.ControlsRow>
          <S.ControlsRow>
            <Button {...ICON_BUTTON_PROPS}>
              <EditIcon size={24} />
            </Button>
            <Button {...ICON_BUTTON_PROPS}>
              <LinkIcon size={24} />
            </Button>
            <Button {...ICON_BUTTON_PROPS} onClick={openFullScreen}>
              <FrameCorners size={24} weight="light" />
            </Button>
          </S.ControlsRow>
        </S.Controls>
      </S.ControlsContainer>
    </S.Container>
  );
}
