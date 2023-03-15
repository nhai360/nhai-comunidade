import { IconProps } from "./types";

export function ReplyIcon({ size = 22, color = "currentColor" }: IconProps) {
  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.4515 9.09375H10.1781C7.91807 9.09375 6.08594 10.9259 6.08594 13.1859V13.1859C6.08594 14.2712 6.51708 15.3121 7.28451 16.0795C8.05194 16.847 9.0928 17.2781 10.1781 17.2781H15.1797C17.4397 17.2781 19.2718 15.446 19.2718 13.1859V13.1859C19.2702 12.3241 18.9944 11.4852 18.4843 10.7906"
          stroke={color}
          strokeWidth="1.36406"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.72313 12.7312H11.9966C14.2566 12.7312 16.0887 10.8991 16.0887 8.63905V8.63905C16.0887 6.379 14.2566 4.54688 11.9966 4.54688H6.99501C4.73496 4.54688 2.90283 6.379 2.90283 8.63905H2.90283C2.90444 9.50083 3.18025 10.3397 3.69035 11.0343"
          stroke={color}
          strokeWidth="1.36406"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
