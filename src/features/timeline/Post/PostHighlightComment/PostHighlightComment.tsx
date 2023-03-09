import { useState } from "react";

import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";

import { Avatar, Button, Divider, Typography } from "@/ui";
import { plugins } from "@/ui/TextArea/plugins";

import { theme } from "@/../stitches.config";
import { HorizontalDotsIcon } from "@/ui/_icons";

import * as S from "./PostHighlightComment.styles";

export function PostHighlightComment() {
  const [editorState, setEditorState] = useState(
    createEditorStateWithText(
      "Adorei ver essa iniciativa de apoio aos empreendedores LGBT. Vamos mostrar que somos capazes de alcançar o sucesso também!",
    ),
  );

  return (
    <>
      <Divider css={{ marginBlock: "$4" }} />
      <S.Container>
        <Avatar.Square
          level="100"
          src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
          alt="Jaqueline Zancanaro"
          fallback="JZ"
        />
        <div>
          <S.CommentHeader>
            <Typography.Title size="h5" weight="bold">
              Jaqueline Zancanaro
            </Typography.Title>
            <S.CommentHeaderActions>
              <Typography.Text size="caption" color="secondary" weight="medium">
                173 Gostaram
              </Typography.Text>
              <Typography.Text size="caption" color="title">
                07 de Maio
              </Typography.Text>
              <Button icon variant="transparent" size="small">
                <HorizontalDotsIcon color={theme.colors.textSecondary.value} />
              </Button>
            </S.CommentHeaderActions>
          </S.CommentHeader>
          <S.CommentContent>
            <Editor
              readOnly
              plugins={plugins}
              editorState={editorState}
              onChange={setEditorState}
            />
          </S.CommentContent>
        </div>
      </S.Container>
    </>
  );
}
