import { IconProps } from "./types";

export function ChevronLeftIcon({
  color = "currentColor",
  size = 28,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.3339 9.3335L11.6672 14.0002L16.3339 18.6668"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
