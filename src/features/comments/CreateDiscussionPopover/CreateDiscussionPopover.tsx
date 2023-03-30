import { useForm } from "react-hook-form";

import { Button, Field, Popover, TextArea, Typography } from "@/ui";
import { ArrowNarrowRightIcon } from "@/ui/_icons";

import * as S from "./CreateDiscussionPopover.styles";

export function CreateDiscussionPopover() {
  const { control, register } = useForm();

  return (
    <Popover css={{ width: "328px" }} side="top" sideOffset={16} size="medium">
      <Typography.Text size="body1" weight="bold" color="title">
        Criar uma discução
      </Typography.Text>
      <S.Form>
        <Field.Input
          label="Título"
          placeholder="Digite o assunto da discussão"
          {...register("title")}
        />
        <Field label="Discução">
          <TextArea
            control={control}
            name="content"
            placeholder="Digite o seu pensamento "
            css={{
              ".public-DraftEditor-content": {
                height: "102px",
              },
            }}
            emojiSelect={false}
          />
        </Field>
        <Button type="submit" fullWidth>
          Criar discução <ArrowNarrowRightIcon />
        </Button>
      </S.Form>
    </Popover>
  );
}