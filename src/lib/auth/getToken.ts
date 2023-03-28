import { getSession } from "./getSession";

export function getToken() {
  const session = getSession();

  return session?.access_token;
}
