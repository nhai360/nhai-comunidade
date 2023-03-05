import { IconProps } from "./types";

export function HomeIcon({ color = "currentColor", size = 28 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.65942 19.25V13.0666C3.65943 11.2946 4.46495 9.61862 5.84869 8.51162L10.5154 4.77829C12.6458 3.0739 15.6731 3.0739 17.8035 4.77829L22.4702 8.51162C23.8539 9.61863 24.6594 11.2946 24.6594 13.0666V19.25C24.6594 22.1495 22.3089 24.5 19.4094 24.5H8.90941C6.00992 24.5 3.65942 22.1495 3.65942 19.25Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
