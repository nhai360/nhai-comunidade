import { IconProps } from "./types";

export function RewardIcon({ size = 24 }: Omit<IconProps, "color">) {
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
        fill="#FEEA66"
        stroke="#FFC100"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.4111 8.0113L15.6204 3.42654C15.8076 3.15922 16.1133 3.00001 16.4397 3H19.9984C20.3713 3 20.7132 3.20746 20.8854 3.53819C21.0576 3.86893 21.0315 4.268 20.8176 4.57347L16.877 10.2029"
        fill="#FFC100"
      />
      <path
        d="M12.4111 8.0113L15.6204 3.42654C15.8076 3.15922 16.1133 3.00001 16.4397 3H19.9984C20.3713 3 20.7132 3.20746 20.8854 3.53819C21.0576 3.86893 21.0315 4.268 20.8176 4.57347L16.877 10.2029"
        stroke="#FFC100"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5892 8.0113L8.37993 3.42654C8.1928 3.15921 7.88701 3 7.5607 3H4.00196C3.62908 3 3.28717 3.20746 3.11498 3.53819C2.94278 3.86893 2.9689 4.268 3.18273 4.57347L7.12337 10.2029"
        fill="#FFC100"
      />
      <path
        d="M11.5892 8.0113L8.37993 3.42654C8.1928 3.15921 7.88701 3 7.5607 3H4.00196C3.62908 3 3.28717 3.20746 3.11498 3.53819C2.94278 3.86893 2.9689 4.268 3.18273 4.57347L7.12337 10.2029"
        stroke="#FFC100"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
