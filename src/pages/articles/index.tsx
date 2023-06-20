import { withAuth } from "@/middlewares";
import { Articles } from "@/features/articles";
import { ArticlesProvider } from "@/contexts/ArticleContext";

function ArticlesPage() {
  return (
    <ArticlesProvider>
      <Articles.AppLayout />
      <Articles.DesktopLayout />
    </ArticlesProvider>
  );
}

export default withAuth(ArticlesPage);
