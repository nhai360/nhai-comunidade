import { ReactNode } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { theme } from "@/../stitches.config";

type Props = {
  children: ReactNode;
  value: number;
};

export function CircularProgressBar({ children, value }: Props) {
  const gradientStyles = buildStyles({
    pathTransition: "none",
    pathColor: "url(#gradient)",
    trailColor: theme.colors.neutral300.value,
  });

  return (
    <CircularProgressbarWithChildren
      value={value}
      styles={gradientStyles}
      strokeWidth={5}
    >
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id="gradient" gradientTransform="90">
            <stop offset="0%" stopColor={theme.colors.pinkMedium.value} />
            <stop offset="30.98%" stopColor={theme.colors.yellowMedium.value} />
            <stop offset="60.93%" stopColor={theme.colors.greenMedium.value} />
            <stop offset="99.14%" stopColor={theme.colors.blueMedium.value} />
          </linearGradient>
        </defs>
      </svg>

      {children}
    </CircularProgressbarWithChildren>
  );
}
