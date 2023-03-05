import { IconProps } from "./types";

export function TrashIcon({ color = "currentColor", size = 30 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.1333 25.5043H10.8665C9.49425 25.5043 8.35336 24.4478 8.24812 23.0796L7.12158 8.43469H22.8781L21.7516 23.0796C21.6464 24.4478 20.5055 25.5043 19.1333 25.5043V25.5043Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.337 8.43477H5.6626"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.7173 4.49561H18.2826C19.0078 4.49561 19.5956 5.08348 19.5956 5.80865V8.43475H10.4043V5.80865C10.4043 5.08348 10.9922 4.49561 11.7173 4.49561Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.2979 13.6869V20.2521"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.7022 13.6869V20.2521"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
