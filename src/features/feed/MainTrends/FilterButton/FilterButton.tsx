import { Button, Popover } from "@/ui";
import { FilterCircleIcon } from "@/ui/_icons";

export function FilterButton() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <span>
          <Button icon variant="transparent" size="small">
            <FilterCircleIcon />
          </Button>
        </span>
      </Popover.Trigger>

      <Popover
        side="bottom"
        sideOffset={16}
        align="end"
        css={{ width: "148px" }}
      >
        <Popover.Action>Discussões</Popover.Action>
        <Popover.Action>Opiniões</Popover.Action>
        <Popover.Action>Enquetes</Popover.Action>
      </Popover>
    </Popover.Root>
  );
}
