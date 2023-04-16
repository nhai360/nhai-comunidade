import { QueryClient } from "react-query";

export function invalidateUserQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries(["user"]);
}

export * from "./useCreateSession";
export * from "./useCreateUser";
export * from "./useUpdateUser";
export * from "./useUser";
export * from "./types";
