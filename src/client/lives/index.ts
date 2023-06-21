import { QueryClient } from "react-query";

export function invalidateLivesQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries("userlives");
}

export function invalidateLiveQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries("live");
}

export * from "./useLive";
export * from "./types";
