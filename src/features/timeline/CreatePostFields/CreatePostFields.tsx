import { useFormContext } from "react-hook-form";

import { Input, TextArea } from "@/ui";

export function CreatePostFields() {
  const { register, watch } = useFormContext();

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
        placeholder="Em que você está pensando?"
        rows={10}
        {...register("content")}
      />
    </>
  );
}
