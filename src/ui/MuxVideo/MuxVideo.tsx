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

  const [volume, setVolume] = useState(50);

  const isFinished = currentTime === durationTime;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5;
    }
  }, []);

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
        envKey={process.env.NEXT_PUBLIC_MUX_ENV_KEY}
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
            <S.VolumeContainer>
              <Tooltip message={`${volume}%`}>
                <Button {...ICON_BUTTON_PROPS} onClick={toggleVolumeState}>
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
