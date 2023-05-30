import { useUser } from "@/client/users";
import { useAuthContext } from "@/contexts";
import { Videos } from "@/features/videos";
import { DefaultLayout } from "@/layouts/desktop";
import { withAuth } from "@/middlewares";
import { useEffect } from "react";
import styles from "./styles.module.scss";
import CardArticle from "@/features/articles/CardArticle";
import { Articles } from "@/features/articles";
import { ArticlesProvider } from "@/contexts/ArticleContext";

function ArticlesPage() {
  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const isAdmin = user?.role?.name === "ADMIN";

  if (!isAdmin) {
    return null;
  }

  return (
    <ArticlesProvider>
      <Articles.AppLayout />
      <Articles.DesktopLayout />
    </ArticlesProvider>
  );
}

export default withAuth(ArticlesPage);
