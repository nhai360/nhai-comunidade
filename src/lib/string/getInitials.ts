export function getInitials(baseString = "") {
  return baseString
    .split(" ")
    .map((n) => n[0])
    .join("");
}
