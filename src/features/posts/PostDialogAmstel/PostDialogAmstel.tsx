import { Dialog, Divider } from "@/ui";

import { PostAmstel } from "@/features/posts";
import { usePost } from "@/client/posts";
import { CommentProvider } from "@/contexts";
import { getFirstNameAndLastName } from "@/lib/string";

import { DesktopPostDialogStats } from "./DesktopPostDialogStats";
import { AppPostDialogStats } from "./AppPostDialogStats";

type Props = {
  postId: string;
  onClose: () => void;
  isAmstel?: boolean;
};

export function PostDialogAmstel({ postId, isAmstel, onClose }: Props) {
  const { post } = usePost({
    postId,
  });

  if (!post) {
    return null;
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <Dialog.Content css={{ borderRadius: 0 }}>
        <Dialog.Header
          closable
          title={`Publicação de ${getFirstNameAndLastName(
            post.author.fullName
          )}`}
        />
        <CommentProvider>
          <Dialog.Body css={{ maxHeight: "53vh" }}>
            <PostAmstel.Header isAmstel post={post} />
            <PostAmstel.Content post={post} />
            <Divider css={{ marginBlock: "$6" }} />
            <DesktopPostDialogStats isAmstel post={post} />
            <AppPostDialogStats post={post} />

            <PostAmstel.CommentList origin={post} originType="posts" expanded />
          </Dialog.Body>
          <Dialog.Footer>
            <PostAmstel.CommentField
              isAmstel
              originType={"posts"}
              origin={post}
            />
          </Dialog.Footer>
        </CommentProvider>
      </Dialog.Content>
    </Dialog>
  );
}
