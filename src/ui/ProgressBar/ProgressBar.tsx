import React from "react";
import Slider from "react-slider";
import styles from "./styles.module.scss";

type ProgressBarProps = {
  currentTime: number;
  durationTime: number;
  onTimeChange: (newTime: number) => void;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  durationTime,
  onTimeChange,
}) => {
  const handleChange = (newTime: number) => {
    onTimeChange(newTime);
  };

  return (
    <>
      <Slider
        min={0}
        step={0.1}
        max={durationTime}
        value={currentTime}
        onChange={handleChange}
        className={styles?.horizontalSlider}
        thumbClassName={styles?.thumb}
        // trackClassName={styles?.track}
        renderTrack={(props, state) =>
          state?.index === 0 ? (
            <div {...props} className={styles?.track} />
          ) : (
            <></>
          )
        }
      />
    </>
  );
};
