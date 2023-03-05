import { InputHTMLAttributes } from "react";

import { SearchIcon } from "@/ui/_icons";

import * as S from "./Search.styles";

export function InputSearch({
  disabled = false,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <S.Container as="div">
      <input placeholder="Buscar" disabled={disabled} {...rest} />
      <button title="Buscar" disabled={disabled}>
        <SearchIcon size={24} />
      </button>
    </S.Container>
  );
}
