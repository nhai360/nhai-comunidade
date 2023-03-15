import { IconProps } from "./types";

export function DeleteIcon({ size = 19, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.1748 5.78748V4.09998C12.1748 3.58221 11.7551 3.16248 11.2373 3.16248H7.1123C6.59454 3.16248 6.1748 3.58221 6.1748 4.09998V5.78748"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.2302 5.78748L13.5135 15.1044C13.4459 15.9836 12.7128 16.6625 11.831 16.6625H6.51882C5.63704 16.6625 4.90393 15.9836 4.83631 15.1044L4.11963 5.78748"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.1748 5.78748H3.1748"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.1748 9.6781V12.6781"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
