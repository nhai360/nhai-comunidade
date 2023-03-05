import { IconProps } from "./types";

export function AddCircleIcon({
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
        d="M13.9998 9.33325V18.6666"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.6668 14.0001H9.3335"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 24.5V24.5C8.2005 24.5 3.5 19.7995 3.5 14V14C3.5 8.2005 8.2005 3.5 14 3.5V3.5C19.7995 3.5 24.5 8.2005 24.5 14V14C24.5 19.7995 19.7995 24.5 14 24.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
