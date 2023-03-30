import { Button, Typography } from "@/ui";
import { QuestionCircleIcon } from "@/ui/_icons";

import * as S from "./HelpButton.styles";

export function HelpButton() {
  return (
    <S.Container>
      <Button icon variant="transparent" size="small">
        <QuestionCircleIcon />
      </Button>

      <S.Tooltip>
        <Typography.Text color="title">
          As principais trends
          <br />
          mostram o que está
          <br />
          acontecendo de mais
          <br />
          relevante na plataforma!
        </Typography.Text>
      </S.Tooltip>
    </S.Container>
  );
}
