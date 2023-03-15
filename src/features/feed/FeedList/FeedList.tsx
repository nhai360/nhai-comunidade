import { usePosts } from "@/client/posts";

import { PostCard } from "@/features/posts";

import * as S from "./FeedList.styles";

export function FeedList() {
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
