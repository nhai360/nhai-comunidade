import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { Dropzone, Field, TextArea } from "@/ui";
import { CreatePostParams } from "@/client/posts";

export function CreatePostUpload() {
  const { register, control, formState } = useFormContext<CreatePostParams>();

  const { errors } = formState;

  const errorText = useMemo(() => {
    const hasTitleError = !!errors.title?.message;
    const hasContentError = !!errors.content?.message;

    if (hasTitleError && hasContentError) {
      return "Título e conteúdo são obrigatórios";
    }

    if (hasTitleError) {
      return errors.title?.message;
    }

    if (hasContentError) {
      return errors.content?.message;
    }

    return undefined;
  }, [errors]);

  return (
    <>
      <Field errorText={errorText}>
        <TextArea
          control={control}
          name="content"
          placeholder="Em que você está pensando?"
          emojiSelectPosition="bottom"
          shouldUnregister
          error={!!errors.content?.message}
          css={{
            ".public-DraftEditor-content": {
              maxHeight: "200px",
            },
          }}
        />
      </Field>
      <Dropzone
        {...register("image", { shouldUnregister: true })}
        control={control}
      />
    </>
  );
}
