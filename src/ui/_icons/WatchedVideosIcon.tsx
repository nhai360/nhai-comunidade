import { IconProps } from "./types";

export function WatchedVideosIcon({
  color = "currentColor",
  size = 16,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 9.16667V4.5C2 3.39543 2.89543 2.5 4 2.5H12C13.1046 2.5 14 3.39543 14 4.5V9.16667C14 10.2712 13.1046 11.1667 12 11.1667H4C2.89543 11.1667 2 10.2712 2 9.16667Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.74805 8.06599V5.60055C6.74808 5.44569 6.83074 5.30261 6.96488 5.22523C7.09903 5.14784 7.26426 5.14791 7.39834 5.22541L9.53153 6.45813C9.66552 6.53554 9.74805 6.67853 9.74805 6.83327C9.74805 6.98801 9.66552 7.131 9.53153 7.20841L7.39835 8.44113C7.26427 8.51863 7.09903 8.5187 6.96488 8.44132C6.83074 8.36393 6.74808 8.22085 6.74805 8.06599V8.06599Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3337 13.8333H6.66699"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.66699 13.8333H4.66699"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66634 14.5001V13.1667"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
