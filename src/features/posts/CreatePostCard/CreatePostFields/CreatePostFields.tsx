import { useFormContext } from "react-hook-form";

import { Field, TextArea } from "@/ui";
import { CreatePostParams } from "@/client/posts";

export function CreatePostFields() {
  const { register, watch, control, formState } =
    useFormContext<CreatePostParams>();

  const selectedColor = watch("color");
  const { errors } = formState;

  return (
    <>
      <Field.Input
        autoFocus
        color={selectedColor}
        placeholder="Qual o título da sua publicação"
        errorText={errors.title?.message}
        {...register("title")}
      />
      <TextArea
        color={selectedColor}
        control={control}
        name="content"
        placeholder="Em que você está pensando?"
        css={{ minHeight: "362px" }}
      />
    </>
  );
}
