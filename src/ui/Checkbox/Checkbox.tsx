import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import { Label } from "@/ui";

import * as S from "./Checkbox.styles";
import { CheckIcon } from "../_icons";

type Props<T extends FieldValues> = {
  label?: string;
  disabled?: boolean;
} & UseControllerProps<T, FieldPath<T>>;

export function Checkbox<T extends FieldValues>({
  label,
  disabled,
  ...rest
}: Props<T>) {
  const { field } = useController<T>(rest);

  return (
    <S.Container>
      <S.Root
        id={field.name}
        name={field.name}
        value={field.value}
        onCheckedChange={field.onChange}
        disabled={disabled}
      >
        <S.Indicator>
          <CheckIcon />
        </S.Indicator>
      </S.Root>

      {label && <Label htmlFor={field.name}>{label}</Label>}
    </S.Container>
  );
}
