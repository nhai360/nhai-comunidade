import { IconProps } from "./types";

export function ColorBrushIcon({
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
        d="M22.5613 8.36326L20.0889 10.8388"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.6296 5.42776L17.1572 7.90329"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.453 18.4532L9.54688 9.54708"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.48336 14.9104L8.38581 15.8129C8.49974 15.9268 8.56149 16.0827 8.55641 16.2438C8.55132 16.4048 8.47987 16.5566 8.35898 16.6631L4.33037 20.2121C3.8227 20.6594 3.5226 21.2967 3.50122 21.9729C3.47985 22.6491 3.73909 23.3041 4.2175 23.7825V23.7825C4.69588 24.2609 5.35081 24.5201 6.02701 24.4987C6.7032 24.4774 7.34045 24.1773 7.78766 23.6696L11.3367 19.641C11.4432 19.5201 11.5949 19.4487 11.7559 19.4436C11.917 19.4385 12.0729 19.5003 12.1868 19.6142L13.0895 20.5168C13.527 20.9544 14.1205 21.2002 14.7393 21.2002C15.3581 21.2002 15.9516 20.9544 16.3892 20.5168L23.7546 13.1515C24.7483 12.1577 24.7483 10.5466 23.7546 9.55283L18.4472 4.24528C17.97 3.76806 17.3228 3.49997 16.6479 3.49997C15.973 3.49997 15.3258 3.76806 14.8486 4.24528L7.48339 11.6104C7.04578 12.048 6.79993 12.6416 6.79992 13.2604C6.79991 13.8793 7.04575 14.4728 7.48336 14.9104Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
