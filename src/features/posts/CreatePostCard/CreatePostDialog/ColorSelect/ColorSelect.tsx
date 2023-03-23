import { useEffect } from "react";
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import { Button, RadioGroup, Tooltip } from "@/ui";
import { ColorBrushIcon } from "@/ui/_icons";

import { Tabs } from "../CreatePostDialog";
import { PostColorDecoder } from "@/client/posts";

type Props<T extends FieldValues> = {
  selected?: boolean;
  onSelectTab: (tab?: Tabs) => void;
} & UseControllerProps<T, FieldPath<T>>;

export function ColorSelect<T extends FieldValues>({
  selected,
  onSelectTab,
  ...rest
}: Props<T>) {
  const { field } = useController(rest);

  useEffect(() => {
    if (!selected && field.value) {
      field.onChange(undefined);
    }
  }, [selected, field]);

  return (
    <>
      <Tooltip message="Cores">
        <Button
          icon
          variant={selected ? "primary" : "transparent"}
          type="button"
          onClick={() => {
            if (selected) {
              return onSelectTab(undefined);
            }

            onSelectTab("color");
          }}
        >
          <ColorBrushIcon />
        </Button>
      </Tooltip>

      {selected && (
        <RadioGroup value={field.value} onValueChange={field.onChange}>
          <RadioGroup.Radio
            value={PostColorDecoder.Values.GREEN}
            color="green"
          />
          <RadioGroup.Radio value={PostColorDecoder.Values.PINK} color="pink" />
          <RadioGroup.Radio value={PostColorDecoder.Values.BLUE} color="blue" />
        </RadioGroup>
      )}
    </>
  );
}
