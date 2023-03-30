import { IconProps } from "./types";

export function PollIcon({
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
        d="M13.2505 11.3243H15.7515C16.0278 11.3243 16.2517 11.5483 16.2517 11.8245V16.8266C16.2517 17.1029 16.0278 17.3268 15.7515 17.3268H13.2505"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2493 17.3269H7.74826C7.472 17.3269 7.24805 17.1029 7.24805 16.8267V13.8254C7.24805 13.5491 7.472 13.3252 7.74826 13.3252H10.2493"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.2508 17.3269H10.2495V8.82333C10.2495 8.54707 10.4735 8.32312 10.7497 8.32312H12.7506C13.0268 8.32312 13.2508 8.54707 13.2508 8.82333V17.3269Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="2.89648"
        y="3.82263"
        width="18.0075"
        height="18.0075"
        rx="5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
