import { QueryClient } from "react-query";

export function invalidateLivesQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries("userlives");
}

export * from "./useLive";
export * from "./types";
