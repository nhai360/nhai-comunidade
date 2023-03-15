import { useState } from "react";

import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";

import { Avatar, Typography } from "@/ui";
import { plugins } from "@/ui/TextArea/plugins";

import { Comment } from "@/client/comments/types";

import { Actions } from "@/features/comments/Comment/Actions";
import {
  Wrapper,
  Container,
  Header,
} from "@/features/comments/Comment/Comment.styles";

import * as S from "./Reply.styles";

type Props = {
  reply: Comment;
  parentId?: string;
};

export function Reply({ reply, parentId }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [editorState, setEditorState] = useState(
    createEditorStateWithText(reply.content),
  );

  const repliesCount = reply.replies?.length || 0;

  const hiddenReplies = repliesCount - 3;
  const hasMoreToSee = hiddenReplies > 0;

  const replies = isExpanded ? reply.replies : reply.replies?.slice(0, 3);

  return (
    <>
      <Wrapper>
        <Avatar.Square
          size="small"
          level={reply.author.level}
          src={reply.author.avatarUrl}
          alt={reply.author.name}
          fallback="JZ"
        />
        <Container>
          <Header>
            <Typography.Title size="h5" weight="bold">
              {reply.author.name}
            </Typography.Title>
            <Actions comment={reply} />
          </Header>
          <S.Content>
            <Editor
              readOnly
              plugins={plugins}
              editorState={editorState}
              onChange={setEditorState}
            />
          </S.Content>

          {replies && (
            <>
              <S.RepliesList css={{ marginTop: "$4" }}>
                {replies.map((r) => (
                  <Reply key={r.id} reply={r} parentId={reply.id} />
                ))}
              </S.RepliesList>
            </>
          )}
        </Container>
      </Wrapper>
      {!parentId && hasMoreToSee && (
        <S.SeeMoreButton
          onClick={() => setIsExpanded((prevState) => !prevState)}
        >
          {isExpanded
            ? `Esconder ${hiddenReplies} respostas`
            : `Ver mais ${hiddenReplies} respostas`}
        </S.SeeMoreButton>
      )}
    </>
  );
}
