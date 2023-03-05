import { IconProps } from "./types";

export function AddPhotoIcon({ color = "currentColor", size = 28 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.3333 3.5V8.16667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 5.83333H25.6667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.3333 5.83333H5.83333C4.54417 5.83333 3.5 6.8775 3.5 8.16667V22.1667C3.5 23.4558 4.54417 24.5 5.83333 24.5H21C22.2892 24.5 23.3333 23.4558 23.3333 22.1667V12.8333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.12814 16.8782L9.88281 14.0945C10.29 13.4493 11.1965 13.3618 11.7191 13.9172L12.9733 15.2495L14.2881 12.4553C14.693 11.5943 15.904 11.5547 16.3648 12.3877L18.8778 16.9353C19.3071 17.7135 18.7436 18.6667 17.8558 18.6667H9.11514C8.19581 18.6667 7.63814 17.6552 8.12814 16.8782Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
