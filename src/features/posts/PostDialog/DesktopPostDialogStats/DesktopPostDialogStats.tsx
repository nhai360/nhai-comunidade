import { Post as PostType } from "@/client/posts";

import { Post } from "@/features/posts";

import * as S from "./DesktopPostDialogStats.styles";

type Props = {
  post: PostType;
};

export function DesktopPostDialogStats({ post }: Props) {
  return (
    <S.Container>
      <Post.Stats post={post} expanded />
    </S.Container>
  );
}
