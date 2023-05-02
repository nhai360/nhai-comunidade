import { IconProps } from "./types";

type Props = {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
} & Omit<IconProps, "color">;

export function TierThreeRewardIcon({
  size = 24,
  primaryColor,
  secondaryColor,
  tertiaryColor,
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
        cx="12"
        cy="14.5"
        r="6.5"
        fill={secondaryColor}
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.999 17.0842L13.796 18.0282C14.146 18.2122 14.555 17.9152 14.488 17.5252L14.145 15.5242L15.599 14.1082C15.882 13.8322 15.726 13.3512 15.335 13.2942L13.326 13.0022L12.428 11.1812C12.253 10.8262 11.748 10.8262 11.573 11.1812L10.675 13.0022L8.66497 13.2952C8.27397 13.3522 8.11797 13.8332 8.40097 14.1092L9.85497 15.5252L9.51197 17.5262C9.44497 17.9162 9.85397 18.2132 10.204 18.0292L12.001 17.0852H11.999V17.0842Z"
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
      <path
        d="M21 10.5L22 9.5"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 18.5L22 19.5"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 14.5H23"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 18.5L2 19.5"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 10.5L2 9.5"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 14.5H1"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
