import * as S from "./Suggestions.styles";

export function Suggestions() {
  return (
    <S.Container>
      <S.SuggestionItem type="book">
        <img src="/book.svg" alt="Livro" width={142} height={108} />
        <strong>Novos artigos todos os dias!</strong>
      </S.SuggestionItem>
      <S.SuggestionItem type="camera">
        <strong>Vídeos de excelente qualidade</strong>
        <img src="/camera.svg" alt="Camera" width={142} height={108} />
      </S.SuggestionItem>
      <S.SuggestionItem type="coin">
        <img src="/coin.svg" alt="Coin" width={162} height={108} />
        <strong>Muitas formas de ganhar dinheiro</strong>
      </S.SuggestionItem>
    </S.Container>
  );
}
