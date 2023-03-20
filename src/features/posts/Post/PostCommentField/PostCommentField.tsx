import { useForm } from "react-hook-form";

import { Avatar, TextArea } from "@/ui";

import * as S from "./PostCommentField.styles";

export function PostCommentField() {
  const { control } = useForm();

  return (
    <S.Form>
      <Avatar.Square
        level="56"
        size="small"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        alt="Colm Tuite"
        fallback="CT"
      />
      <TextArea
        name="comment"
        control={control}
        placeholder="Deixe sua opinião..."
        css={{
          ".public-DraftEditor-content": {
            maxHeight: "50px",
          },
        }}
      />
    </S.Form>
  );
}
