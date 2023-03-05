import { useEffect } from "react";
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import { Button, RadioGroup } from "@/ui";
import { ColorBrushIcon } from "@/ui/_icons";

import { Tabs } from "../CreatePostDialog";

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
      <Button
        icon
        variant={selected ? "primary" : "transparent"}
        type="button"
        onClick={() => {
          if (selected) {
            onSelectTab(undefined);
          }

          onSelectTab("color");
        }}
      >
        <ColorBrushIcon />
      </Button>

      {selected && (
        <RadioGroup value={field.value} onValueChange={field.onChange}>
          <RadioGroup.Radio value="green" color="green" />
          <RadioGroup.Radio value="pink" color="pink" />
          <RadioGroup.Radio value="blue" color="blue" />
        </RadioGroup>
      )}
    </>
  );
}
