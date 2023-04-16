import Link from "next/link";

import { Avatar, Button, Card, Typography } from "@/ui";
import { ShareSquareIcon } from "@/ui/_icons";

import { theme } from "@/../stitches.config";
import { useTrending } from "@/client/posts";
import {
  getFirstNameAndLastName,
  getInitials,
  getProfileUrl,
} from "@/lib/string";
import { FeatureDecoder, useFeatureFlag } from "@/lib/features";

import { FilterButton } from "./FilterButton";
import { HelpButton } from "./HelpButton";

import * as S from "./MainTrends.styles";

export function MainTrends() {
  const { posts } = useTrending();

  const { isEnabled: isEnabledFilter } = useFeatureFlag(
    FeatureDecoder.Values.FILTER_TRENDING,
  );

  return (
    <Card>
      <S.Header>
        <Typography.Text size="body2" weight="bold" color="title">
          Principais trends
        </Typography.Text>
        <S.Actions>
          {isEnabledFilter && <FilterButton />}
          <HelpButton />
        </S.Actions>
      </S.Header>
      <S.TrendList>
        {posts.map((post) => (
          <S.TrendItem key={post.id}>
            <Avatar.Square
              alt={post.author.fullName}
              src={post.author.profilePicture?.url}
              fallback={getInitials(post.author.fullName)}
              profileUrl={getProfileUrl(post.author.nickname)}
            />
            <S.TrendItemContent>
              {isEnabledFilter && <S.TagFromStatus>Opinião</S.TagFromStatus>}
              <Typography.Text
                size="body3"
                color="title"
                weight="bold"
                title={post.title}
                css={{
                  textOverflow: "ellipsis",
                  maxWidth: "200px",
                  overflowX: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {post.title}
              </Typography.Text>
              <Typography.Text size="caption" color="secondary">
                {getFirstNameAndLastName(post.author.fullName)}
              </Typography.Text>
            </S.TrendItemContent>
            <Link href={`?postId=${post.id}`}>
              <Button icon size="small" variant="transparent">
                <ShareSquareIcon color={theme.colors.textSecondary.value} />
              </Button>
            </Link>
          </S.TrendItem>
        ))}
      </S.TrendList>
    </Card>
  );
}
