import { useRouter } from "next/router";

import { useAuthContext } from "@/contexts";
import { useVideosFromUser } from "@/client/videos";

import { VideoCard } from "@/features/videos";

import * as S from "./UploadedArticles.styles";
import { useArticles } from "@/client/articles";
import CardArticle from "@/features/articles/CardArticle";
import { useArticlesFromUser } from "@/client/articles/useArticlesFromUser";
import { useUser, useUserFromNickname } from "@/client/users";

interface IUploadedArticles {
  userId: string;
}

export function UploadedArticles({ userId }: IUploadedArticles) {
  const { articles } = useArticlesFromUser({
    userId: userId as string,
  });

  return (
    <S.Container>
      {articles.map((article) => (
        <CardArticle key={article.id} article={article} />
      ))}
    </S.Container>
  );
}
