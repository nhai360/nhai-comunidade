import { useQuery } from "react-query";

export async function getPosts() {
  const posts = localStorage.getItem("@nhai-comunidade:posts");

  if (posts) {
    return JSON.parse(posts);
  }

  return [];
}

export function usePosts() {
  const { data: posts, ...rest } = useQuery({
    queryFn: getPosts,
  });

  return {
    posts,
    ...rest,
  };
}
