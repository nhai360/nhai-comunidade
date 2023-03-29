import Router from "next/router";

import { authenticatedAPI } from "@/client";

export function logout() {
  localStorage.removeItem("@nhai-comunidade:session");
  authenticatedAPI.defaults.headers.common.Authorization = undefined;

  Router.push("/auth/login");
}
