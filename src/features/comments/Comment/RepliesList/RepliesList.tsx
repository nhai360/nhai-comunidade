import { Divider } from "@/ui";
import { Comment } from "@/client/comments";

import { Reply } from "../Reply";

import * as S from "./RepliesList.styles";
import { ComponentProps } from "react";

type Props = {
  replies?: Comment[];
  divider?: boolean;
  parentId?: string;
} & Partial<ComponentProps<typeof S.Container>>;

export function RepliesList({
  replies = [],
  divider,
  parentId,
  ...rest
}: Props) {
  if (replies.length === 0) {
    return null;
  }

  return (
    <>
      {divider && <Divider />}
      <S.Container {...rest}>
        {replies.map((reply) => (
          <Reply key={reply.id} reply={reply} parentId={parentId} />
        ))}
      </S.Container>
    </>
  );
}
