import { IconProps } from "./types";

export function EditIcon({ size = 19, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.14455 12.6267L11.8891 4.88222C12.1816 4.58972 12.6563 4.58972 12.9488 4.88222L14.2058 6.13922C14.4983 6.43172 14.4983 6.90647 14.2058 7.19897L6.46055 14.9427C6.3203 15.0837 6.1298 15.1625 5.93105 15.1625H3.9248V13.1562C3.9248 12.9575 4.00355 12.767 4.14455 12.6267Z"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4873 6.28247L12.8048 8.59997"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
