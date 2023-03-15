import { Typography } from "@/ui";

import { EditProfileButton } from "./EditProfileButton";

import * as S from "./GeneralInformation.styles";
import { ArticlesIcon, ClockIcon, WatchedVideosIcon } from "@/ui/_icons";

export function GeneralInformation() {
  return (
    <S.Container>
      <S.InformationField>
        <Typography.Text size="h3">Calm Tuite</Typography.Text>
        <EditProfileButton />
      </S.InformationField>
      <S.InformationField>
        <img src="/flags/brasil.svg" />
        <Typography.Text color="secondary" size="body3">
          Brasil, São Paulo
        </Typography.Text>
      </S.InformationField>
      <S.InformationField css={{ marginBlock: "$4" }}>
        <Typography.Text size="body3">@calmtuite</Typography.Text>
        <Typography.Text size="body3">•</Typography.Text>
        <ClockIcon />
        <Typography.Text size="body3">
          Por aqui desde fevereiro de 2016
        </Typography.Text>
        <Typography.Text size="body3">•</Typography.Text>
        <WatchedVideosIcon />
        <Typography.Text size="body3">
          36 mil minutos de vídeo assistido
        </Typography.Text>
        <Typography.Text size="body3">•</Typography.Text>
        <ArticlesIcon />
        <Typography.Text size="body3">27 artigos lidos</Typography.Text>
      </S.InformationField>
      <S.Description size="caption" color="secondary">
        Olá! Meu nome é Jéssica Padilha e sou uma empreendedora LGBT+. Estou
        sempre em busca de novos desafios e oportunidades para crescer como
        profissional.
      </S.Description>
    </S.Container>
  );
}
