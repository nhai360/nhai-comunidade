import { useState } from "react";

import { AddCircleIcon } from "@/ui/_icons";
import { CreatePostDialog } from "@/features/posts/CreatePostCard/CreatePostDialog";

import * as S from "./CreatePostButton.styles";
import { useRouter } from "next/router";
import CreateArticleDialog from "@/features/articles/CreateArticleDialog";
import { CreateBroadcastDialog } from "@/features/broadcast/CreateBroadcastCard";
import { UploadVideoDialog } from "@/features/videos";

export function CreatePostButton() {
  const router = useRouter();
  const path = router?.pathname?.split("/")[1];

  const [show, setShow] = useState(false);

  return (
    <>
      {show && path === "" && (
        <CreatePostDialog onClose={() => setShow(false)} />
      )}

      {show && path === "videos" && (
        <UploadVideoDialog onClose={() => setShow(false)} />
      )}

      {/* {show && path === "videos" && (
        <CreateBroadcastDialog
          onClose={() => setShow(false)}
        />
      )} */}

      {show && path === "articles" && (
        <CreateArticleDialog type="create" onClose={() => setShow(false)} />
      )}

      <S.Container onClick={() => setShow(true)}>
        <AddCircleIcon />
      </S.Container>
    </>
  );
}
