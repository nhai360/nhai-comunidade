import { IconProps } from "./types";

export function ShareSquareIcon({
  color = "currentColor",
  size = 16,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6665 2H13.9998V5.33333"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.3335 6.66667L14.0002 2"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.6667 9.33325V12.6666C12.6667 13.4033 12.07 13.9999 11.3333 13.9999H3.33333C2.59667 13.9999 2 13.4033 2 12.6666V4.66659C2 3.92992 2.59667 3.33325 3.33333 3.33325H6.66667"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
