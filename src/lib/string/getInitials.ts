export function getInitials(baseString = "") {
  if (!baseString.includes(" ")) {
    return baseString;
  }

  const [firstName] = baseString.split(" ");
  const lastName = baseString.split(" ").at(-1);

  return [
    firstName.charAt(0).toUpperCase(),
    lastName?.charAt(0).toUpperCase(),
  ].join("");
}
