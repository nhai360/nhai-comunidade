import { IconProps } from "./types";

type Props = {
  primaryColor: string;
  secondaryColor: string;
} & Omit<IconProps, "color">;

export function TierOneRewardIcon({
  size = 24,
  primaryColor,
  secondaryColor,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="6.5"
        cy="6.5"
        r="6.5"
        transform="matrix(-1 0 0 1 18.5 8)"
        fill={primaryColor}
        stroke={secondaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.589 8.0113L8.37968 3.42654C8.19256 3.15922 7.88678 3.00001 7.56047 3H4.00173C3.62885 3 3.28694 3.20746 3.11475 3.53819C2.94255 3.86893 2.96866 4.268 3.1825 4.57347L7.12314 10.2029"
        fill={secondaryColor}
      />
      <path
        d="M11.589 8.0113L8.37968 3.42654C8.19256 3.15922 7.88678 3.00001 7.56047 3H4.00173C3.62885 3 3.28694 3.20746 3.11475 3.53819C2.94255 3.86893 2.96866 4.268 3.1825 4.57347L7.12314 10.2029"
        stroke={secondaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.411 8.0113L15.6203 3.42654C15.8074 3.15921 16.1132 3 16.4395 3H19.9983C20.3712 3 20.7131 3.20746 20.8853 3.53819C21.0575 3.86893 21.0313 4.268 20.8175 4.57347L16.8769 10.2029"
        fill={secondaryColor}
      />
      <path
        d="M12.411 8.0113L15.6203 3.42654C15.8074 3.15921 16.1132 3 16.4395 3H19.9983C20.3712 3 20.7131 3.20746 20.8853 3.53819C21.0575 3.86893 21.0313 4.268 20.8175 4.57347L16.8769 10.2029"
        stroke={secondaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
