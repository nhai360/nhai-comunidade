import { IconProps } from "./types";

export function CameraIcon({ color = "currentColor", size = 28 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.6667 12.0079L22.7212 9.50876C23.0811 9.28687 23.5329 9.27709 23.9021 9.4832C24.2713 9.68932 24.5001 10.0791 24.5001 10.5019V18.6649C24.5001 19.0877 24.2713 19.4774 23.9021 19.6835C23.533 19.8896 23.0812 19.8798 22.7212 19.658L18.6667 17.1587"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="3.5"
        y="7"
        width="15.1667"
        height="15.1667"
        rx="3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
