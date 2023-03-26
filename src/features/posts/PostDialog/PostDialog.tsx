import { Dialog, Divider } from "@/ui";

import { Post } from "@/features/posts";
import { Post as PostType } from "@/client/posts";
import { CommentProvider } from "@/contexts";

type Props = {
  post: PostType;
  onClose: () => void;
};

export function PostDialog({ post, onClose }: Props) {
  return (
    <Dialog open onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Header
          title={`Publicação de ${post.author.fullName}`}
          closable
        />
        <CommentProvider>
          <Dialog.Body css={{ maxHeight: "53vh" }}>
            <Post.Header post={post} />
            <Post.Content post={post} />
            <Divider css={{ marginBlock: "$6" }} />
            <Post.Counter post={post} expanded />

            <Post.CommentList post={post} expanded />
          </Dialog.Body>
          <Dialog.Footer>
            <Post.CommentField post={post} />
          </Dialog.Footer>
        </CommentProvider>
      </Dialog.Content>
    </Dialog>
  );
}
