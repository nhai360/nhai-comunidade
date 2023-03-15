import { Avatar, Button, Card, Typography } from "@/ui";
import {
  FilterCircleIcon,
  QuestionCircleIcon,
  ShareSquareIcon,
} from "@/ui/_icons";

import { theme } from "@/../stitches.config";

import * as S from "./MainTrends.styles";

export function MainTrends() {
  return (
    <Card>
      <S.Header>
        <Typography.Text size="body2" weight="bold" color="title">
          Principais trends
        </Typography.Text>
        <S.Actions>
          <Button icon variant="transparent" size="small">
            <FilterCircleIcon />
          </Button>
          <Button icon variant="transparent" size="small">
            <QuestionCircleIcon />
          </Button>
        </S.Actions>
      </S.Header>
      <S.TrendList>
        <S.TrendItem>
          <Avatar.Square
            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
            alt="Colm Tuite"
            fallback="CT"
          />
          <S.TrendItemContent>
            <S.TagFromStatus>Opinião</S.TagFromStatus>
            <Typography.Text size="body3" color="title" weight="bold">
              Como construir uma empresa...
            </Typography.Text>
            <Typography.Text size="caption" color="secondary">
              Carlos Alberto
            </Typography.Text>
          </S.TrendItemContent>
          <Button icon size="small" variant="transparent">
            <ShareSquareIcon color={theme.colors.textSecondary.value} />
          </Button>
        </S.TrendItem>
        <S.TrendItem>
          <Avatar.Square
            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
            alt="Colm Tuite"
            fallback="CT"
          />
          <S.TrendItemContent>
            <S.TagFromStatus variant="green">Discussão</S.TagFromStatus>
            <Typography.Text size="body3" color="title" weight="bold">
              Como construir uma empresa...
            </Typography.Text>
            <Typography.Text size="caption" color="secondary">
              Carlos Alberto
            </Typography.Text>
          </S.TrendItemContent>
          <Button icon size="small" variant="transparent">
            <ShareSquareIcon color={theme.colors.textSecondary.value} />
          </Button>
        </S.TrendItem>
        <S.TrendItem>
          <Avatar.Square
            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
            alt="Colm Tuite"
            fallback="CT"
          />
          <S.TrendItemContent>
            <S.TagFromStatus variant="yellow">Enquete</S.TagFromStatus>
            <Typography.Text size="body3" color="title" weight="bold">
              Como construir uma empresa...
            </Typography.Text>
            <Typography.Text size="caption" color="secondary">
              Carlos Alberto
            </Typography.Text>
          </S.TrendItemContent>
          <Button icon size="small" variant="transparent">
            <ShareSquareIcon color={theme.colors.textSecondary.value} />
          </Button>
        </S.TrendItem>
      </S.TrendList>
    </Card>
  );
}
