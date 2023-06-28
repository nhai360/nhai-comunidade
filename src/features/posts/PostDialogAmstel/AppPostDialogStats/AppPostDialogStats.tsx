import { Post } from "@/client/posts";

import { LikeButton } from "@/features/posts/PostCard/AppPostCardFooter/LikeButton";
import { CopyPostUrlButton } from "@/features/posts/PostCard/AppPostCardFooter/CopyPostUrlButton";

import * as S from "./AppPostDialogStats.styles";

type Props = {
  post: Post;
};

export function AppPostDialogStats({ post }: Props) {
  return (
    <S.Container>
      <LikeButton isAmstel post={post} />
      <CopyPostUrlButton isAmstel post={post} />
    </S.Container>
  );
}
