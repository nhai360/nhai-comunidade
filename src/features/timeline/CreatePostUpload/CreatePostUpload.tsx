import { useFormContext } from "react-hook-form";

import { Dropzone, TextArea } from "@/ui";
import { CreatePostParams } from "@/client/posts";

export function CreatePostUpload() {
  const { register, control, formState } = useFormContext<CreatePostParams>();

  const { errors } = formState;

  return (
    <>
      <TextArea
        control={control}
        name="content"
        placeholder="Em que você está pensando?"
        errorText={errors.content?.message}
      />
      <Dropzone {...register("file")} control={control} />
    </>
  );
}
