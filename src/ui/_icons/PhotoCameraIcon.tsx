import { IconProps } from "./types";

export function PhotoCameraIcon({
  color = "currentColor",
  size = 23,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5966 10.6003V15.0987C19.5966 17.5831 17.5826 19.5971 15.0982 19.5971H7.90074C5.41635 19.5971 3.40234 17.5831 3.40234 15.0987V7.90123C3.40234 5.41683 5.41635 3.40283 7.90074 3.40283H12.3991"
        stroke={color}
        strokeWidth="1.3875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7902 9.20951C15.0547 10.4745 15.0545 12.525 13.7897 13.7897C12.5249 15.0544 10.4743 15.0544 9.2095 13.7897C7.94468 12.525 7.94446 10.4745 9.20901 9.20951C9.81644 8.60188 10.6404 8.2605 11.4996 8.2605C12.3588 8.2605 13.1827 8.60188 13.7902 9.20951"
        stroke={color}
        strokeWidth="1.3875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.998 4.75245H20.4964"
        stroke={color}
        strokeWidth="1.3875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.2467 7.0017V2.5033"
        stroke={color}
        strokeWidth="1.3875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
