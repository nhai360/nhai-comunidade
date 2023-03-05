import {
  ForwardRefRenderFunction,
  forwardRef,
  InputHTMLAttributes,
} from "react";

import { Input, Label, Typography } from "@/ui";

import * as S from "./Field.styles";

type Props = {
  label?: string;
  helperText?: string;
  errorText?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FieldElement: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { label, helperText, errorText, name, required, ...rest },
  ref,
) => {
  const hasError = Boolean(errorText);

  return (
    <S.Container>
      {label && (
        <S.LabelContainer>
          <Label htmlFor={name}>{label}</Label>

          {!required && (
            <Typography.Text size="body3" color="secondary">
              Opcional
            </Typography.Text>
          )}
        </S.LabelContainer>
      )}

      <Input
        ref={ref}
        id={name}
        name={name}
        error={hasError}
        {...rest}
        size="medium"
        color="neutral"
      />

      {helperText && (
        <Typography.Text as="small" color="secondary">
          {helperText}
        </Typography.Text>
      )}

      {errorText && (
        <Typography.Text as="small" color="pink">
          {errorText}
        </Typography.Text>
      )}
    </S.Container>
  );
};

export const Field = forwardRef(FieldElement);
