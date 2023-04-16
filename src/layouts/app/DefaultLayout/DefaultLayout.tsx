import { ComponentProps } from "react";

import * as S from "./DefaultLayout.styles";

import { Header } from "./Header";
import { BottomBar } from "./BottomBar";
import { CreatePostButton } from "./CreatePostButton";

export function DefaultLayout({
  children,
  ...rest
}: ComponentProps<typeof S.Wrapper>) {
  return <S.Wrapper {...rest}>{children}</S.Wrapper>;
}

DefaultLayout.Header = Header;
DefaultLayout.BottomBar = BottomBar;
DefaultLayout.Content = S.Content;
DefaultLayout.CreatePostButton = CreatePostButton;
