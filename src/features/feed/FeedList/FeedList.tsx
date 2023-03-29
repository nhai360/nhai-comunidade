import { useFeedContext } from "@/contexts";
import { PostCard } from "@/features/posts";

import * as S from "./FeedList.styles";

export function FeedList() {
  const { posts } = useFeedContext();

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
