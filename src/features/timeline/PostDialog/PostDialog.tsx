import { Dialog } from "@/ui";

import { Post } from "@/features/timeline";
import { Post as PostType } from "@/client/posts";

type Props = {
  post: PostType;
  onClose: () => void;
};

export function PostDialog({ post, onClose }: Props) {
  return (
    <Dialog.Root open onOpenChange={onClose}>
      <Dialog title="Publicação de Raquel Virgínia">
        <Post post={post} />
      </Dialog>
    </Dialog.Root>
  );
}
