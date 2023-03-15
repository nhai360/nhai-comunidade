import { IconProps } from "./types";

export function CheckIcon({ color = "currentColor", size = 12 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5303 1.1363C11.8232 1.42919 11.8232 1.90406 11.5303 2.19696L4.86366 8.86362C4.57077 9.15652 4.0959 9.15652 3.803 8.86362L0.46967 5.53029C0.176777 5.2374 0.176777 4.76252 0.46967 4.46963C0.762563 4.17674 1.23744 4.17674 1.53033 4.46963L4.33333 7.27263L10.4697 1.1363C10.7626 0.843403 11.2374 0.843403 11.5303 1.1363Z"
        fill={color}
      />
    </svg>
  );
}
