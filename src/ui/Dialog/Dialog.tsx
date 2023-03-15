import { DialogHeader } from "./Header";

import * as S from "./Dialog.styles";
import { DialogProps } from "@radix-ui/react-dialog";

export function Dialog({ children, ...rest }: DialogProps) {
  return (
    <S.Root {...rest}>
      <S.Portal>
        <S.Overlay />
        {children}
      </S.Portal>
    </S.Root>
  );
}

Dialog.Root = S.Root;

Dialog.Trigger = S.Trigger;

Dialog.Content = S.Content;

Dialog.Body = S.Body;

Dialog.Overlay = S.Overlay;

Dialog.Portal = S.Portal;

Dialog.Header = DialogHeader;

Dialog.Footer = S.Footer;
