import { useState } from "react";
import { Reorder } from "framer-motion";

import { Button, Field, Popover, Typography } from "@/ui";

import * as S from "./CreatePollPopover.styles";
import { OptionItem } from "./OptionItem";
import { ArrowNarrowRightIcon } from "@/ui/_icons";

export function CreatePollPopover() {
  const [items, setItems] = useState(["1", "2"]);

  return (
    <Popover css={{ width: "328px" }} side="top" sideOffset={16} size="medium">
      <Typography.Text size="body1" weight="bold" color="title">
        Criar uma enquete
      </Typography.Text>
      <S.Form>
        <Field.Input
          label="Pergunta"
          placeholder="Digite a pergunta da enquete"
        />
        <Field label="Opções">
          <Reorder.Group axis="y" values={items} onReorder={setItems}>
            {items.map((item) => (
              <OptionItem key={item} value={item} />
            ))}
          </Reorder.Group>
        </Field>
        <Button fullWidth>
          Criar enquete <ArrowNarrowRightIcon />
        </Button>
      </S.Form>
    </Popover>
  );
}
