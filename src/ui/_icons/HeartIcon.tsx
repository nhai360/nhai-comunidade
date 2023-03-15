import { IconProps } from "./types";

export function HeartIcon({ size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5091 5.97426L12 6.49118L11.4908 5.97418C10.5625 5.03112 9.29461 4.50006 7.97132 4.50006C6.64804 4.50006 5.38012 5.03112 4.45182 5.97418V5.97418C2.51606 7.96343 2.51606 11.1323 4.45182 13.1216L9.84447 18.5972C10.413 19.1748 11.1896 19.5 12 19.5C12.8105 19.5 13.587 19.1748 14.1556 18.5972L19.5482 13.1217C21.4839 11.1324 21.4839 7.96353 19.5482 5.97427V5.97427C18.6199 5.03118 17.3519 4.5001 16.0286 4.50009C14.7053 4.50009 13.4374 5.03117 12.5091 5.97426Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
