export function getToken() {
  if (typeof localStorage === "undefined") return null;

  const sessionFromStorage = localStorage.getItem("@nhai-comunidade:session");

  if (sessionFromStorage) {
    const { access_token: token } = JSON.parse(sessionFromStorage);

    return token;
  }

  return null;
}
