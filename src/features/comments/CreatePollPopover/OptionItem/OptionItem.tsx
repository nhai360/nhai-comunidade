import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useFormContext } from "react-hook-form";

import { Input } from "@/ui";
import { ReorderIcon } from "@/ui/_icons";
import { theme } from "@/../stitches.config";

import * as S from "./OptionlItem.styles";
import { useEffect } from "react";

type Props = {
  value: string;
};

export function OptionItem({ value }: Props) {
  const y = useMotionValue(0);
  const dragControls = useDragControls();

  const { register, unregister } = useFormContext();

  useEffect(() => {
    register(`options.${value}.id`, {
      value,
    });

    return () => {
      unregister(`options.${value}.id`);
    };
  }, [register, unregister, value]);

  return (
    <S.Container>
      <Reorder.Item
        value={value}
        id={value}
        style={{ y }}
        dragListener={false}
        dragControls={dragControls}
      >
        <Input
          placeholder="Adicionar opção"
          css={{ marginBottom: "$2" }}
          {...register(`options.${value}.name`)}
        />
        <S.ReorderIcon
          type="button"
          onPointerDown={(event) => dragControls.start(event)}
        >
          <ReorderIcon color={theme.colors.textAuxiliary.value} />
        </S.ReorderIcon>
      </Reorder.Item>
    </S.Container>
  );
}
