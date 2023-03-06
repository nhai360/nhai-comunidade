import { useFormContext } from "react-hook-form";

import { Input, TextArea } from "@/ui";

export function CreatePostFields() {
  const { register, watch, control } = useFormContext();

  const selectedColor = watch("color");

  return (
    <>
      <Input
        autoFocus
        color={selectedColor}
        placeholder="Qual o título da sua publicação"
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
