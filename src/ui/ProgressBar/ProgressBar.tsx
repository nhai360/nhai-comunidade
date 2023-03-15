import * as S from "./ProgressBar.styles";

type Props = {
  currentPercent?: number;
};

export function ProgressBar({ currentPercent = 0 }: Props) {
  return (
    <S.Container>
      <S.Filled css={{ width: `${currentPercent}%` }} />
    </S.Container>
  );
}
