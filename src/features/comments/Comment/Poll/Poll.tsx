import { useAuthContext } from "@/contexts";
import { Checkbox, ProgressBar, Typography } from "@/ui";
import { CommentOption, useVoteComment } from "@/client/comments";

import * as S from "./Poll.styles";

type Props = {
  commentId: string;
  options: CommentOption[];
};

export function Poll({ commentId, options }: Props) {
  const { session } = useAuthContext();

  const { voteComment } = useVoteComment();

  const votedOption = options.find((option) =>
    option.votedBy.find((votedBy) => votedBy.authorId === session?.userId),
  );

  const totalVotes = options.reduce(
    (acc, option) => acc + option.totalVotes,
    0,
  );

  function handleChange(option: CommentOption) {
    if (!session?.userId) return;

    const alreadyVoted = votedOption?.id === option.id;

    voteComment({
      commentId,
      optionId: option.id,
      alreadyVoted,
    });
  }

  return (
    <S.OptionsList>
      {options.map((option) => (
        <S.OptionItem key={option.id}>
          <Checkbox.Controlled
            name={option.id}
            checked={votedOption?.id === option.id}
            onCheckedChange={() => handleChange(option)}
          />
          <S.Content>
            <S.Label>
              <Typography.Text size="body3" weight="bold">
                {option.name}
              </Typography.Text>
              <Typography.Text color="secondary" size="caption">
                {option.totalVotes} votos
              </Typography.Text>
            </S.Label>
            <ProgressBar
              currentPercent={(option.totalVotes / totalVotes) * 100}
            />
          </S.Content>
        </S.OptionItem>
      ))}
    </S.OptionsList>
  );
}
