import { IconProps } from "./types";

export function ClockIcon({ color = "currentColor", size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="8.99957"
        cy="8.49981"
        r="6.0025"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3026 9.26761L8.99902 8.49996V4.49829"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
