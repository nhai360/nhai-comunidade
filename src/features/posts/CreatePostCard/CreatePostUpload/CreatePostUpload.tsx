import { useFormContext } from "react-hook-form";

import { Dropzone, TextArea } from "@/ui";
import { CreatePostParams } from "@/client/posts";

export function CreatePostUpload() {
  const { register, control } = useFormContext<CreatePostParams>();

  return (
    <>
      <TextArea
        control={control}
        name="content"
        placeholder="Em que você está pensando?"
        emojiSelectPosition="bottom"
        css={{
          ".public-DraftEditor-content": {
            maxHeight: "200px",
          },
        }}
      />
      <Dropzone {...register("file")} control={control} />
    </>
  );
}
