import { useRef } from "react";
import { useVirtual } from "@tanstack/react-virtual";

import { useFeedContext } from "@/contexts";
import { PostCard } from "@/features/posts";

import * as S from "./FeedList.styles";

export function FeedList() {
  const parentRef = useRef(null);

  const { posts } = useFeedContext();

  const { totalSize, virtualItems, measure } = useVirtual({
    size: posts.length,
    parentRef,
    keyExtractor: (index) => posts[index].id,
  });

  if (virtualItems.length === 0) {
    return null;
  }

  return (
    <S.Container ref={parentRef} css={{ height: totalSize }}>
      <S.List
        css={{
          transform: `translateY(${virtualItems[0].start}px)`,
        }}
      >
        {virtualItems?.map((virtualItem) => {
          const post = posts.find((post) => post.id === virtualItem.key);

          if (!post) {
            return null;
          }

          return (
            <li key={post.id} ref={measure}>
              <PostCard post={post} />
            </li>
          );
        })}
      </S.List>
    </S.Container>
  );
}
