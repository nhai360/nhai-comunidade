import { useMutation } from "react-query";

import { CreatePostParams, getPosts } from "@/client/posts";

async function createPostRequest(params: CreatePostParams) {
  const post = {
    id: String(Math.random()),
    ...params,
  };

  const posts = await getPosts();

  const newPosts = [...posts, post];

  localStorage.setItem("@nhai-comunidade:posts", JSON.stringify(newPosts));

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(newPosts);
    }, 3000);
  });
}

export function useCreatePost() {
  const { mutate: createPost, ...rest } = useMutation({
    mutationFn: createPostRequest,
  });

  return {
    createPost,
    ...rest,
  };
}
