import { usePosts } from "@/client/posts";

import { PostCard } from "@/features/timeline";

import * as S from "./PostsList.styles";

export function PostsList() {
  const { posts } = usePosts();

  return (
    <S.Container>
      {posts?.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </S.Container>
  );
}
