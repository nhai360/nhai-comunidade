import { ColorBrushIcon, AddPhotoIcon } from "@/ui/_icons";

import { Avatar, Button, Dialog, Input, TextArea } from "@/ui";

import * as S from "./CreatePostDialog.styles";

type Props = {
  onClose: () => void;
};

export function CreatePostDialog({ onClose }: Props) {
  return (
    <Dialog.Root open onOpenChange={onClose}>
      <Dialog title="Criar novo post">
        <S.Container>
          <Avatar.Square
            size="large"
            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
            alt="Colm Tuite"
            fallback="CT"
          />
          <S.Form>
            <Input placeholder="Começar nova publicação" />
            <TextArea placeholder="Em que você está pensando?" rows={10} />
            <S.Footer>
              <S.Actions>
                <Button icon variant="transparent" type="button">
                  <ColorBrushIcon />
                </Button>
                <Button icon variant="transparent" type="button">
                  <AddPhotoIcon />
                </Button>
              </S.Actions>

              <Button type="submit">Publicar</Button>
            </S.Footer>
          </S.Form>
        </S.Container>
      </Dialog>
    </Dialog.Root>
  );
}
