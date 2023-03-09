import { Button } from "@/ui";
import { HeartIcon } from "@/ui/_icons";

export function LikeButton() {
  return (
    <Button size="medium">
      <HeartIcon />
      Curtir
    </Button>
  );
}
