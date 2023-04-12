import { Session } from "@/client/users";

export function getSession(): Session | null {
  console.log(typeof localStorage);

  if (typeof localStorage === "undefined") return null;

  const sessionFromStorage = localStorage.getItem("@nhai-comunidade:session");

  if (sessionFromStorage) {
    return JSON.parse(sessionFromStorage);
  }

  return null;
}
