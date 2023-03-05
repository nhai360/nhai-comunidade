import { Button } from "@/ui";
import { AddPhotoIcon } from "@/ui/_icons";

import { Tabs } from "../CreatePostDialog";

type Props = {
  selected: boolean;
  onSelectTab: (tab?: Tabs) => void;
};

export function UploadButton({ selected, onSelectTab }: Props) {
  function handleClick() {
    if (selected) {
      onSelectTab(undefined);
    }

    onSelectTab("upload");
  }

  return (
    <Button
      icon
      variant={selected ? "primary" : "transparent"}
      type="button"
      onClick={handleClick}
    >
      <AddPhotoIcon />
    </Button>
  );
}
