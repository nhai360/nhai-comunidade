import { IconProps } from "./types";

export function SmileysIcon({ color = "currentColor", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.3639 6.46099C21.8787 9.97571 21.8787 15.6742 18.3639 19.1889C14.8492 22.7036 9.15074 22.7036 5.63604 19.1889C2.12132 15.6742 2.12132 9.97569 5.63604 6.46099C9.15076 2.94627 14.8492 2.94627 18.3639 6.46099"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 10.325H8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 9.82495V10.825"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 15.5129C15.5 15.5129 14.187 16.8249 12 16.8249C9.812 16.8249 8.5 15.5129 8.5 15.5129"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
