import { withAuth } from "@/middlewares";
import { ArticleDetails } from "@/features/articles/articlesDetails";
import { useRouter } from "next/router";

function ArticleDetailsPage() {
  const router = useRouter();

  return (
    <>
      <ArticleDetails.AppLayout />
      <ArticleDetails.DesktopLayout />
    </>
  );
}

export default withAuth(ArticleDetailsPage);
