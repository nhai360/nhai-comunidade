import { useRouter } from "next/router";

import { useAuthContext } from "@/contexts";
import { useVideosFromUser } from "@/client/videos";

import { VideoCard } from "@/features/videos";

import * as S from "./UploadedArticles.styles";
import { useArticles } from "@/client/articles";
import CardArticle from "@/features/articles/CardArticle";
import { useArticlesFromUser } from "@/client/articles/useArticlesFromUser";
import { useUser } from "@/client/users";

export function UploadedArticles() {
  const router = useRouter();

  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const { articles } = useArticlesFromUser({
    userId: user?.id as string,
  });

  return (
    <S.Container>
      {articles.map((article) => (
        <CardArticle key={article.id} article={article} />
      ))}
    </S.Container>
  );
}
