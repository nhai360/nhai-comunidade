import { IconProps } from "./types";

type Props = {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
} & Omit<IconProps, "color">;

export function TierTwoRewardIcon({
  size = 24,
  primaryColor,
  secondaryColor,
  tertiaryColor,
}: Props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="14.5"
        r="6.5"
        fill={secondaryColor}
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="14.5"
        r="2.5"
        stroke={tertiaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.411 8.0113L15.6203 3.42654C15.8074 3.15922 16.1132 3.00001 16.4395 3H19.9983C20.3711 3 20.7131 3.20746 20.8853 3.53819C21.0575 3.86893 21.0313 4.268 20.8175 4.57347L16.8769 10.2029"
        fill={primaryColor}
      />
      <path
        d="M12.411 8.0113L15.6203 3.42654C15.8074 3.15922 16.1132 3.00001 16.4395 3H19.9983C20.3711 3 20.7131 3.20746 20.8853 3.53819C21.0575 3.86893 21.0313 4.268 20.8175 4.57347L16.8769 10.2029"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.589 8.0113L8.37969 3.42654C8.19256 3.15921 7.88677 3 7.56046 3H4.00172C3.62884 3 3.28693 3.20746 3.11473 3.53819C2.94253 3.86893 2.96865 4.268 3.18249 4.57347L7.12313 10.2029"
        fill={primaryColor}
      />
      <path
        d="M11.589 8.0113L8.37969 3.42654C8.19256 3.15921 7.88677 3 7.56046 3H4.00172C3.62884 3 3.28693 3.20746 3.11473 3.53819C2.94253 3.86893 2.96865 4.268 3.18249 4.57347L7.12313 10.2029"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
