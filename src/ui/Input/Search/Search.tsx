import { FormEvent, InputHTMLAttributes } from "react";

import { Button } from "@/ui";
import { SearchIcon } from "@/ui/_icons";

import * as S from "./Search.styles";
import { useRouter } from "next/router";

type Props = {
  onSearch: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputSearch({ disabled = false, onSearch, ...rest }: Props) {
  const router = useRouter();

  const path = router?.pathname?.split("/")[1];
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSearch();
  }

  const showSearch = path === "videos" || path === "articles" || path === "";
  const placeholder =
    path === "videos"
      ? "Buscar vídeo..."
      : path === "articles"
      ? "Buscar artigo..."
      : path === ""
      ? "Buscar post..."
      : "Buscar";

  return showSearch ? (
    <S.Container onSubmit={handleSubmit}>
      <input placeholder={placeholder} disabled={disabled} {...rest} />
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
  ) : (
    <></>
  );
}
