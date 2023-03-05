import { useFormContext } from "react-hook-form";

import { Dropzone, TextArea } from "@/ui";

export function CreatePostUpload() {
  const { register, control } = useFormContext();

  return (
    <>
      <TextArea
        autoFocus
        placeholder="Em que você está pensando?"
        rows={5}
        {...register("content")}
      />
      <Dropzone {...register("attachments")} control={control} />
    </>
  );
}
