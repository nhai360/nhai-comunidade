type Props = {
  variant?: "rainbow" | "white";
};

export function Logo({ variant = "white" }: Props) {
  if (variant === "rainbow") {
    return <img src="/logo-rainbow.svg" />;
  }

  return <img src="/logo-white.svg" />;
}
