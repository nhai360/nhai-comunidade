import { useQuery } from "react-query";

import { Post } from "@/client/posts/types";

export async function getPosts() {
  const posts = localStorage.getItem("@nhai-comunidade:posts");

  if (posts) {
    return JSON.parse(posts);
  }

  return [];
}

export function usePosts() {
  const { data: posts, ...rest } = useQuery<Post[]>({
    queryFn: getPosts,
    queryKey: ["posts"],
  });

  return {
    posts,
    ...rest,
  };
}
