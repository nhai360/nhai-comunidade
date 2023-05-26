import { useState } from "react";
import { Reorder } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import compact from "lodash/compact";

import { Button, Field, Popover, Typography } from "@/ui";
import { ArrowNarrowRightIcon } from "@/ui/_icons";
import {
  CommentType,
  CreateCommentParams,
  useCreateComment,
} from "@/client/comments";

import { OptionItem } from "./OptionItem";
import * as S from "./CreatePollPopover.styles";

type Props = {
  originId: string;
  originType: "posts" | "videos";
};

export function CreatePollPopover({ originId, originType }: Props) {
  const form = useForm<CreateCommentParams>();

  const { register, handleSubmit, reset } = form;

  const { createComment } = useCreateComment();

  const [orderedOptions, setOrderedOptions] = useState(["1", "2"]);

  function handleCreatePoll({ content, options = [] }: CreateCommentParams) {
    const orderedOptionsWithValue = orderedOptions.map((optionId) => {
      const option = compact(options).find(({ id }) => optionId === id);

      if (option) {
        return { name: option.name };
      }

      return undefined;
    });

    createComment(
      {
        originId,
        content,
        type: CommentType.POLL,
        options: compact(orderedOptionsWithValue),
        originType,
      },
      {
        onSuccess: () => {
          reset();

          toast.success("Enquete criada com sucesso!");
        },
      }
    );
  }

  return (
    <Popover css={{ width: "328px" }} side="top" sideOffset={16} size="medium">
      <Typography.Text size="body1" weight="bold" color="title">
        Criar uma enquete
      </Typography.Text>
      <FormProvider {...form}>
        <S.Form onSubmit={handleSubmit(handleCreatePoll)}>
          <Field.Input
            label="Pergunta"
            placeholder="Digite a pergunta da enquete"
            {...register("content")}
          />
          <Field label="Opções">
            <Reorder.Group
              axis="y"
              values={orderedOptions}
              onReorder={setOrderedOptions}
            >
              {orderedOptions.map((option) => (
                <OptionItem key={option} value={option} />
              ))}
            </Reorder.Group>
          </Field>
          <Button
            type="button"
            fullWidth
            css={{ minHeight: "56px" }}
            onClick={handleSubmit(handleCreatePoll)}
          >
            Criar enquete <ArrowNarrowRightIcon />
          </Button>
        </S.Form>
      </FormProvider>
    </Popover>
  );
}
