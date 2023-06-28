import { Dialog, Divider } from "@/ui";

import { Post } from "@/features/posts";
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

export function PostDialog({ postId, isAmstel, onClose }: Props) {
  const { post } = usePost({
    postId,
  });

  if (!post) {
    return null;
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Header
          closable
          title={`Publicação de ${getFirstNameAndLastName(
            post.author.fullName
          )}`}
        />
        <CommentProvider>
          <Dialog.Body css={{ maxHeight: "53vh" }}>
            <Post.Header post={post} />
            <Post.Content post={post} />
            <Divider css={{ marginBlock: "$6" }} />
            <DesktopPostDialogStats post={post} />
            <AppPostDialogStats post={post} />

            <Post.CommentList origin={post} originType="posts" expanded />
          </Dialog.Body>
          <Dialog.Footer>
            <Post.CommentField originType={"posts"} origin={post} />
          </Dialog.Footer>
        </CommentProvider>
      </Dialog.Content>
    </Dialog>
  );
}
