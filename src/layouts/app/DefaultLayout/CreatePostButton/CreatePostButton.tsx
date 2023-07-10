import { useState } from "react";

import { AddCircleIcon } from "@/ui/_icons";
import { CreatePostDialog } from "@/features/posts/CreatePostCard/CreatePostDialog";

import * as S from "./CreatePostButton.styles";
import { useRouter } from "next/router";
import CreateArticleDialog from "@/features/articles/CreateArticleDialog";
import { UploadVideoDialog } from "@/features/videos";
import { useUser } from "@/client/users";
import { useAuthContext } from "@/contexts";

export function CreatePostButton() {
  const { session } = useAuthContext();
  const router = useRouter();
  const path = router?.pathname?.split("/")[1];

  const [show, setShow] = useState(false);

  const { user } = useUser({
    id: session?.userId,
  });

  const isAdmin = user?.role?.name === "ADMIN";

  return (
    <>
      {show && path === "" && (
        <CreatePostDialog onClose={() => setShow(false)} />
      )}

      {show && path === "videos" && isAdmin && (
        <UploadVideoDialog onClose={() => setShow(false)} />
      )}

      {/* {show && path === "videos" && (
        <CreateBroadcastDialog
          onClose={() => setShow(false)}
        />
      )} */}

      {show && path === "articles" && isAdmin && (
        <CreateArticleDialog type="create" onClose={() => setShow(false)} />
      )}

      <S.Container onClick={() => setShow(true)}>
        <AddCircleIcon />
      </S.Container>
    </>
  );
}
