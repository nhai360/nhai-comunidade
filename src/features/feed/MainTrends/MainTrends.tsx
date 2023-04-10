import { Avatar, Button, Card, Typography } from "@/ui";
import { ShareSquareIcon } from "@/ui/_icons";

import { theme } from "@/../stitches.config";
import { useTrendPosts } from "@/client/posts";
import { getFirstNameAndLastName, getInitials } from "@/lib/string";

import { FilterButton } from "./FilterButton";
import { HelpButton } from "./HelpButton";

import * as S from "./MainTrends.styles";

export function MainTrends() {
  const { trendPosts } = useTrendPosts();

  return (
    <Card>
      <S.Header>
        <Typography.Text size="body2" weight="bold" color="title">
          Principais trends
        </Typography.Text>
        <S.Actions>
          <FilterButton />
          <HelpButton />
        </S.Actions>
      </S.Header>
      <S.TrendList>
        {trendPosts.map((post) => (
          <S.TrendItem key={post.id}>
            <Avatar.Square
              alt={post.author.fullName}
              fallback={getInitials(post.author.fullName)}
            />
            <S.TrendItemContent>
              <S.TagFromStatus>Opinião</S.TagFromStatus>
              <Typography.Text size="body3" color="title" weight="bold">
                Como construir uma empresa...
              </Typography.Text>
              <Typography.Text size="caption" color="secondary">
                {getFirstNameAndLastName(post.author.fullName)}
              </Typography.Text>
            </S.TrendItemContent>
            <Button icon size="small" variant="transparent">
              <ShareSquareIcon color={theme.colors.textSecondary.value} />
            </Button>
          </S.TrendItem>
        ))}
      </S.TrendList>
    </Card>
  );
}
