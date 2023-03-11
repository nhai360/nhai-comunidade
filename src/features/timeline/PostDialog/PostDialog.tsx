import { Dialog, Divider } from "@/ui";

import { Post } from "@/features/timeline";
import { Post as PostType } from "@/client/posts";

type Props = {
  post: PostType;
  onClose: () => void;
};

export function PostDialog({ post, onClose }: Props) {
  return (
    <Dialog open onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Header title="Publicação de Colm Tuite" closable />
        <Dialog.Body css={{ maxHeight: "53vh" }}>
          <Post.Header />
          <Post.Content post={post} />
          <Divider css={{ marginBlock: "$6" }} />
          <Post.Counter post={post} expanded />

          <Post.CommentList expanded />
        </Dialog.Body>
        <Dialog.Footer>
          <Post.CommentField />
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
