import { IconProps } from "./types";

export function HorizontalDotsIcon({
  color = "currentColor",
  size = 30,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.5876 14.9998C22.5876 15.3221 22.3263 15.5834 22.004 15.5834C21.6817 15.5834 21.4204 15.3221 21.4204 14.9998C21.4204 14.6775 21.6817 14.4163 22.004 14.4163C22.3263 14.4163 22.5876 14.6775 22.5876 14.9998"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5832 14.9998C15.5832 15.3221 15.3219 15.5834 14.9996 15.5834C14.6773 15.5834 14.416 15.3221 14.416 14.9998C14.416 14.6775 14.6773 14.4163 14.9996 14.4163C15.3219 14.4163 15.5832 14.6775 15.5832 14.9998"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.58317 14.9998C8.58317 15.3221 8.32189 15.5834 7.99959 15.5834C7.67729 15.5834 7.41602 15.3221 7.41602 14.9998C7.41602 14.6775 7.67729 14.4163 7.99959 14.4163C8.32189 14.4163 8.58317 14.6775 8.58317 14.9998"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
