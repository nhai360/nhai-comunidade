import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { CheckboxProps } from "@radix-ui/react-checkbox";

import { Label } from "@/ui";

import * as S from "./Checkbox.styles";
import { CheckIcon } from "../_icons";

type Props<T extends FieldValues> = {
  label?: string;
  disabled?: boolean;
} & UseControllerProps<T, FieldPath<T>> &
  CheckboxProps;

function CheckboxControlled<T extends FieldValues>({
  name,
  label,
  ...rest
}: Props<T>) {
  return (
    <S.Container>
      <S.Root id={name} name={name} {...rest}>
        <S.Indicator>
          <CheckIcon />
        </S.Indicator>
      </S.Root>

      {label && <Label htmlFor={name}>{label}</Label>}
    </S.Container>
  );
}

export function Checkbox<T extends FieldValues>({
  label,
  disabled,
  ...rest
}: Props<T>) {
  const { field } = useController<T>(rest);

  return (
    <CheckboxControlled
      name={field.name}
      value={field.value}
      onCheckedChange={field.onChange}
      disabled={disabled}
      label={label}
    />
  );
}

Checkbox.Controlled = CheckboxControlled;
