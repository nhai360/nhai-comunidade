export function getInitials(baseString: string) {
  return baseString
    .split(" ")
    .map((n) => n[0])
    .join("");
}
