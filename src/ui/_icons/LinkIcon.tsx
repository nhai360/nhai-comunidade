import { IconProps } from "./types";

export function LinkIcon({ color = "currentColor", size = 30 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.2244 17.2887L22.7816 14.7315C24.8124 12.6495 24.7916 9.32164 22.7351 7.26509C20.6785 5.20855 17.3507 5.18781 15.2687 7.21856L12.7114 9.77579"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.1123 11.8872L11.8867 18.1128"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.77823 12.7112L7.221 15.2684C5.19025 17.3504 5.21099 20.6783 7.26753 22.7348C9.32408 24.7914 12.6519 24.8121 14.734 22.7814L17.2912 20.2241"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
