import { Card } from "@/ui";
import { Post } from "@/features/timeline";
import { Post as PostType } from "@/client/posts";

type Props = {
  post: PostType;
};

export function PostCard({ post }: Props) {
  return (
    <Card ghost>
      <Post post={post} />
    </Card>
  );
}
