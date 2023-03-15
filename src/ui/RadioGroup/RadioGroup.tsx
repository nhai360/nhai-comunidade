import { ReactNode } from "react";
import { Radio } from "./Radio";

import * as S from "./RadioGroup.styles";
import { RadioGroupProps } from "@radix-ui/react-radio-group";

type Props = {
  children: ReactNode;
} & RadioGroupProps;

export function RadioGroup({ children, ...rest }: Props) {
  return <S.Root {...rest}>{children}</S.Root>;
}

RadioGroup.Radio = Radio;
