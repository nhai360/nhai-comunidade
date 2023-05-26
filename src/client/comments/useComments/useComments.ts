import { authenticatedAPI, decodeResponse } from "@/client";

import { CommentDecoder, Comment, GetParams } from "@/client/comments";
import { UseQueryOptions, useQuery } from "react-query";

async function getComments({ originId, originType = "posts" }: GetParams) {
  const response = await authenticatedAPI.get(
    `/${originType}/${originId}/comments`
  );

  return decodeResponse<Comment[]>(response, CommentDecoder.array());
}

export function useComments(
  params: GetParams,
  options?: UseQueryOptions<Comment[]>
) {
  const { data: comments, ...rest } = useQuery({
    enabled: !!params.originId,
    queryKey: ["comments", params],
    queryFn: () => getComments(params),
    ...options,
  });

  return {
    comments: comments || [],
    ...rest,
  };
}
