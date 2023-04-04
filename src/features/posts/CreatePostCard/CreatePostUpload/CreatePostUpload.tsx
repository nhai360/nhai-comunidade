import { useFormContext } from "react-hook-form";

import { Dropzone, Field, TextArea } from "@/ui";
import { CreatePostParams } from "@/client/posts";

export function CreatePostUpload() {
  const { register, control, formState } = useFormContext<CreatePostParams>();

  const { errors } = formState;

  return (
    <>
      <Field.Input
        autoFocus
        placeholder="Qual o título da sua publicação"
        errorText={errors.title?.message}
        {...register("title")}
      />
      <Field errorText={errors.content?.message}>
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
