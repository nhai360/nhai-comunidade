import { IconProps } from "./types";

export function JoystickIcon({ size = 24 }: Omit<IconProps, "color">) {
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
        d="M18.4397 5H5.55999C3.98607 5 2.67974 6.21635 2.56761 7.78628L2.00802 15.6206C1.94564 16.4941 2.24914 17.3542 2.84591 17.9951C3.44267 18.636 4.27898 19 5.1547 19C6.66999 19 7.97122 17.9227 8.25399 16.434L8.52633 15H15.4733L15.7457 16.4339C16.0284 17.9226 17.3297 19 18.845 19C19.7207 19 20.557 18.636 21.1538 17.9951C21.7506 17.3542 22.0541 16.494 21.9917 15.6205L21.4321 7.78625C21.3199 6.21634 20.0136 5 18.4397 5Z"
        fill="#FABDD4"
        stroke="#F23D80"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
