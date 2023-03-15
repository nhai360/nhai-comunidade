import { IconProps } from "./types";

export function FilterCircleIcon({
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
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.6249 13.1486C15.0882 12.4994 16.0227 11.0394 15.9995 9.43871C15.9746 8.90715 15.532 8.49146 14.9999 8.49988H8.99994C8.46787 8.49146 8.0253 8.90715 8.00042 9.43871C7.97718 11.0394 8.91165 12.4994 10.3749 13.1486"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.625 13.1487V15.4999C13.625 16.0522 13.1773 16.4999 12.625 16.4999H11.375C10.8227 16.4999 10.375 16.0522 10.375 15.4999V13.1487"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
