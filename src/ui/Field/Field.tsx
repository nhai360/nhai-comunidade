import { ForwardRefRenderFunction, forwardRef, ReactNode } from "react";

import {
  Input,
  InputProps,
  Select,
  SelectProps,
  Label,
  Typography,
} from "@/ui";

import * as S from "./Field.styles";

import AsyncCreatableSelect from "react-select/async-creatable";

type FieldProps = {
  htmlFor?: string;
  label?: string;
  helperText?: string;
  errorText?: string;
  setValue?: any;
  required?: boolean;
  children?: ReactNode;
};

export function Field({
  label,
  helperText,
  htmlFor,
  errorText,
  required = true,
  children,
}: FieldProps) {
  return (
    <S.Container>
      {label && (
        <S.LabelContainer>
          <Label htmlFor={htmlFor}>{label}</Label>

          {!required && (
            <Typography.Text size="body3" color="secondary">
              Opcional
            </Typography.Text>
          )}
        </S.LabelContainer>
      )}

      {children}

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
}

type FieldInputProps = FieldProps & InputProps;

const FieldInput: ForwardRefRenderFunction<
  HTMLInputElement,
  FieldInputProps
> = (
  { label, helperText, errorText, name, required, setValue, ...rest },
  ref
) => {
  const hasError = Boolean(errorText);

  return (
    <Field
      label={label}
      helperText={helperText}
      errorText={errorText}
      htmlFor={name}
      required={required}
    >
      <Input
        ref={ref}
        id={name}
        name={name}
        error={hasError}
        {...rest}
        size="medium"
      />
    </Field>
  );
};

type FieldSelectProps = FieldProps & SelectProps;

const FieldSelect = (
  {
    label,
    helperText,
    errorText,
    name,
    required,
    data,
    onChange,
    ...rest
  }: any,
  ref: any
) => {
  const hasError = Boolean(errorText);

  return (
    <Field
      label={label}
      helperText={helperText}
      errorText={errorText}
      htmlFor={name}
      required={required}
    >
      <AsyncCreatableSelect
        ref={ref as any}
        id={name}
        name={name}
        error={hasError}
        size="medium"
        isClearable
        defaultOptions={data}
        onChange={(a: any) => onChange(name, a?.value)}
        {...rest}
      />
    </Field>
  );
};

Field.Select = forwardRef(FieldSelect);
Field.Input = forwardRef(FieldInput);
