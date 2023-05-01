import { IconProps } from "./types";

export function FireIcon({
  size = 26,
  fill = "#E7E7E7",
  stroke = "#DADADA",
}: Omit<IconProps, "color">) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.19807 8.5597L10.6809 4.49646L14.4357 8.87712L16.8653 6.04255L18.802 8.30204C20.0465 9.75394 20.7305 11.6031 20.7305 13.5154V13.773C20.7305 15.8233 19.9161 17.7896 18.4663 19.2393C17.0166 20.6891 15.0503 21.5035 13 21.5035C8.73059 21.5035 5.26953 18.0425 5.26953 13.7731C5.26953 11.8608 5.95359 10.0116 7.19807 8.5597Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
