import { IconProps } from "./types";

export function PlayIcon({ color = "currentColor", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 12V12C21 16.971 16.971 21 12 21V21C7.029 21 3 16.971 3 12V12C3 7.029 7.029 3 12 3V3C16.971 3 21 7.029 21 12Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9411 9.05807L14.8231 11.3541C15.3141 11.6441 15.3141 12.3551 14.8231 12.6451L10.9411 14.9411C10.4411 15.2371 9.80908 14.8761 9.80908 14.2951V9.70407C9.80908 9.12307 10.4411 8.76207 10.9411 9.05807V9.05807Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
