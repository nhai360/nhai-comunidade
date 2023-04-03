import { Dialog, Divider } from "@/ui";

import { Post } from "@/features/posts";
import { usePost } from "@/client/posts";
import { CommentProvider } from "@/contexts";
import { getFullName } from "@/lib/string";

type Props = {
  postId: string;
  onClose: () => void;
};

export function PostDialog({ postId, onClose }: Props) {
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
          title={`Publicação de ${getFullName(post.author.fullName)}`}
          closable
        />
        <CommentProvider>
          <Dialog.Body css={{ maxHeight: "53vh" }}>
            <Post.Header post={post} />
            <Post.Content post={post} />
            <Divider css={{ marginBlock: "$6" }} />
            <Post.Stats post={post} expanded />

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
