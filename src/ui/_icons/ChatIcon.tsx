import { IconProps } from "./types";

export function ChatIcon({
  color = "currentColor",
  strokeWidth = "1.5",
  size = 24,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.07783 22.633C9.78583 22.633 11.9818 20.437 11.9818 17.729C11.9818 15.021 9.78683 12.825 7.07783 12.825C4.36883 12.825 2.17383 15.021 2.17383 17.729"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.083 22.638C6.345 22.638 5.646 22.475 5.018 22.184L2 22.825L2.631 19.801C2.338 19.171 2.174 18.469 2.174 17.729"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.557 12.853C6.199 12.032 6 11.137 6 10.198C6 6.18101 9.598 2.95801 14 2.95801C18.402 2.95801 22 6.18101 22 10.198C22 12.572 20.738 14.662 18.801 15.98C18.802 16.736 18.8 17.755 18.8 18.825L15.661 17.279C15.124 17.382 14.569 17.438 14 17.438C13.293 17.438 12.607 17.354 11.953 17.197"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
