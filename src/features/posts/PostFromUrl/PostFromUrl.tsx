import { useState } from "react";
import { useRouter } from "next/router";

import { PostDialog } from "@/features/posts";

export function PostFromUrl() {
  const router = useRouter();

  const [alreadyIsClosed, setAlreadyIsClosed] = useState(false);

  const { postId } = router.query;

  if (!postId) {
    return null;
  }

  if (alreadyIsClosed) {
    return null;
  }

  return (
    <PostDialog
      postId={postId as string}
      onClose={() => setAlreadyIsClosed(true)}
    />
  );
}
