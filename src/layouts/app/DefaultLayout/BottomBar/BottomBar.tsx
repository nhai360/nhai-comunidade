import { useState } from "react";

import { Button, NavigationItem } from "@/ui";
import {
  CameraIcon,
  HomeIcon,
  ListLineParagraphSquareIcon,
  SearchIcon,
} from "@/ui/_icons";

import { SearchDialog } from "../SearchDialog";
import * as S from "./BottomBar.styles";

export function BottomBar() {
  const [isSearchDialogVisible, setIsSearchDialogVisible] = useState(false);

  return (
    <S.Container>
      <NavigationItem active>
        <HomeIcon />
      </NavigationItem>
      <NavigationItem disabled>
        <CameraIcon />
      </NavigationItem>
      <NavigationItem disabled>
        <ListLineParagraphSquareIcon />
      </NavigationItem>
      <Button
        icon
        variant="transparent"
        onClick={() => setIsSearchDialogVisible(true)}
      >
        <SearchIcon size={28} />
      </Button>

      {isSearchDialogVisible && (
        <SearchDialog onClose={() => setIsSearchDialogVisible(false)} />
      )}
    </S.Container>
  );
}
