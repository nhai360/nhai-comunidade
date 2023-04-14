import { useState } from "react";

import { Button } from "@/ui";
import { Post } from "@/client/posts";

type Props = {
  post: Post;
};

export function CopyPostUrlButton({ post }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  function handleCopyPostUrl() {
    if (isCopied) return;

    navigator.clipboard.writeText(
      `${window.location.origin}?postId=${post.id}`,
    );

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }

  return (
    <Button
      variant="text"
      size="small"
      ghost
      css={{ color: "$blueDark", fontSize: "$body3", fontWeight: 500 }}
      onClick={handleCopyPostUrl}
    >
      {isCopied ? "Copiado" : "Copiar"}
    </Button>
  );
}
