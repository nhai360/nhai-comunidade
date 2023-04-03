export function getFirstNameAndLastName(fullName = "") {
  if (!fullName.includes(" ")) {
    return fullName;
  }

  const [firstName] = fullName.split(" ");
  const lastName = fullName.split(" ").at(-1);

  return [firstName, lastName].join(" ");
}
