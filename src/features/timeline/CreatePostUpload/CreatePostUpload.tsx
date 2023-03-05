import { useFormContext } from "react-hook-form";
import { TextArea } from "@/ui";

export function CreatePostUpload() {
  const { register } = useFormContext();

  return (
    <>
      <TextArea
        placeholder="Em que você está pensando?"
        rows={3}
        {...register("content")}
      />
    </>
  );
}
