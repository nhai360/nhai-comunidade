import { FormEvent } from "react";

import { Button, Dialog, Input } from "@/ui";
import { ArrowNarrowRightIcon } from "@/ui/_icons";

import { useSearch } from "@/lib/search";

import * as S from "./SearchDialog.styles";

type Props = {
  onClose: () => void;
};

export function SearchDialog({ onClose }: Props) {
  const { searchTerm, handleChange, handleSearch } = useSearch();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    handleSearch();
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Header title="Faça uma pesquisa" closable />
        <Dialog.Body>
          <S.Form onSubmit={handleSubmit}>
            <Input
              value={searchTerm}
              placeholder="Buscar"
              onChange={handleChange}
            />
            <Button type="submit" icon>
              <ArrowNarrowRightIcon />
            </Button>
          </S.Form>
        </Dialog.Body>
      </Dialog.Content>
    </Dialog>
  );
}
