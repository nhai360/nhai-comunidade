import { FormEvent, InputHTMLAttributes } from "react";

import { Button } from "@/ui";
import { SearchIcon } from "@/ui/_icons";

import * as S from "./Search.styles";

type Props = {
  onSearch: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputSearch({ disabled = false, onSearch, ...rest }: Props) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSearch();
  }

  return (
    <S.Container onSubmit={handleSubmit}>
      <input placeholder="Buscar" disabled={disabled} {...rest} />
      <Button
        icon
        type="submit"
        variant="transparent"
        size="small"
        disabled={disabled}
      >
        <SearchIcon size={24} />
      </Button>
    </S.Container>
  );
}
