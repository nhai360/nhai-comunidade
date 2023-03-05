import { IconProps } from "./types";

export function NotificationIcon({
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
        d="M11.0952 21V21.5973C11.0952 23.2004 12.3948 24.5 13.9979 24.5H14.0002C14.7704 24.5003 15.5091 24.1947 16.0539 23.6503C16.5987 23.106 16.9049 22.3675 16.9052 21.5973V21"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.99984 16.9167V11.6667C6.99984 7.80075 10.1338 4.66675 13.9998 4.66675V4.66675C15.8564 4.66675 17.6368 5.40425 18.9496 6.717C20.2623 8.02976 20.9998 9.81023 20.9998 11.6667V16.9167H21.2915C22.4191 16.9167 23.3332 17.8308 23.3332 18.9584V18.9584C23.3332 20.086 22.4191 21.0001 21.2915 21.0001H6.70817C5.58059 21.0001 4.6665 20.086 4.6665 18.9584V18.9584C4.6665 17.8308 5.58059 16.9167 6.70817 16.9167H6.99984Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
