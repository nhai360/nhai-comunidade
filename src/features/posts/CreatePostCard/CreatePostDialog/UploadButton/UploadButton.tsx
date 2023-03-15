import { Button, Tooltip } from "@/ui";
import { AddPhotoIcon } from "@/ui/_icons";

import { Tabs } from "../CreatePostDialog";

type Props = {
  selected: boolean;
  onSelectTab: (tab?: Tabs) => void;
};

export function UploadButton({ selected, onSelectTab }: Props) {
  function handleClick() {
    if (selected) {
      return onSelectTab(undefined);
    }

    onSelectTab("upload");
  }

  return (
    <Tooltip message="Upload">
      <Button
        icon
        variant={selected ? "primary" : "transparent"}
        type="button"
        onClick={handleClick}
      >
        <AddPhotoIcon />
      </Button>
    </Tooltip>
  );
}
