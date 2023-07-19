import {
  ForwardRefRenderFunction,
  forwardRef,
  ReactNode,
  useState,
} from "react";

import MaskedInput from "react-text-mask";

import { Input, InputProps, SelectProps, Label, Typography } from "@/ui";

import * as S from "./Field.styles";

import AsyncCreatableSelect from "react-select/async-creatable";
import { Eye, EyeClosed } from "@phosphor-icons/react";

type FieldProps = {
  htmlFor?: string;
  label?: string;
  helperText?: string;
  errorText?: string;
  setValue?: any;
  required?: boolean;
  children?: ReactNode;
  mask?: "phone";
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
  { label, helperText, errorText, name, required, setValue, mask, ...rest },
  ref
) => {
  const hasError = Boolean(errorText);

  const [hidePassword, setHidePassword] = useState(rest?.type === "password");

  return (
    <Field
      label={label}
      helperText={helperText}
      errorText={errorText}
      htmlFor={name}
      required={required}
    >
      {mask === "phone" ? (
        <MaskedInput
          mask={phoneMask}
          placeholder="+__ (___) ____-____"
          guide={false}
          {...(rest as any)}
          onChange={(value) => setValue("phone", value?.target?.value)}
          render={(ref, props) => (
            <Input
              ref={ref as any}
              id={name}
              name={name}
              error={hasError}
              {...rest}
              {...props}
              size="medium"
            />
          )}
        />
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Input
            ref={ref}
            id={name}
            name={name}
            error={hasError}
            {...rest}
            size="medium"
            type={
              rest?.type !== "password"
                ? rest?.type
                : hidePassword
                ? "password"
                : "text"
            }
          />
          {rest?.type === "password" && !hidePassword && (
            <Eye
              style={{ marginLeft: -40 }}
              onClick={() => setHidePassword(!hidePassword)}
              size={18}
            />
          )}
          {rest?.type === "password" && hidePassword && (
            <EyeClosed
              style={{ marginLeft: -40 }}
              onClick={() => setHidePassword(!hidePassword)}
              size={18}
            />
          )}
        </div>
      )}
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
    isSearchable = true,
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
        maxMenuHeight={120}
        defaultOptions={data}
        onChange={(a: any) => onChange(name, a?.value)}
        isSearchable={isSearchable}
        {...rest}
      />
    </Field>
  );
};

Field.Select = forwardRef(FieldSelect);
Field.Input = forwardRef(FieldInput);

const phoneMask = [
  "+",
  /\d/,
  /\d/,
  " ",
  "(",
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
