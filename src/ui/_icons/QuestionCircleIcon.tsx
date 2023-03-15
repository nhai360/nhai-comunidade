import { IconProps } from "./types";

export function QuestionCircleIcon({
  color = "currentColor",
  size = 24,
}: IconProps) {
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
        d="M12 21V21C7.029 21 3 16.971 3 12V12C3 7.029 7.029 3 12 3V3C16.971 3 21 7.029 21 12V12C21 16.971 16.971 21 12 21Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 13.25V13C12 12.183 12.505 11.74 13.011 11.4C13.505 11.067 14 10.633 14 9.83301C14 8.72801 13.105 7.83301 12 7.83301C10.895 7.83301 10 8.72801 10 9.83301"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.999 16C11.861 16 11.749 16.112 11.75 16.25C11.75 16.388 11.862 16.5 12 16.5C12.138 16.5 12.25 16.388 12.25 16.25C12.25 16.112 12.138 16 11.999 16"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
