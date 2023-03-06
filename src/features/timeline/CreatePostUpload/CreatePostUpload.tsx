import { useFormContext } from "react-hook-form";

import { Dropzone, TextArea } from "@/ui";

export function CreatePostUpload() {
  const { register, control } = useFormContext();

  return (
    <>
      <TextArea
        autoFocus
        control={control}
        name="content"
        placeholder="Em que você está pensando?"
      />
      <Dropzone {...register("attachments")} control={control} />
    </>
  );
}
