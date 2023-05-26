import { withAuth } from "@/middlewares";

import { VideoPlayer } from "@/features/video-player";
import { useAuthContext } from "@/contexts";
import { useUser } from "@/client/users";
import { ArticleDetails } from "@/features/articles/articlesDetails";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getToken } from "@/lib/auth";

function ArticleDetailsPage() {
  const router = useRouter();
  const { session } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [articleData, setArticleData] = useState();

  const { articleId } = router.query;

  const { user } = useUser({
    id: session?.userId,
  });

  const isAdmin = user?.role?.name === "ADMIN";

  const handleArticle = async () => {
    try {
      setLoading(true);
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/article/${articleId}`;

      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setArticleData(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      console.log(articleData);
    }
  };

  useEffect(() => {
    handleArticle();
  }, []);

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <ArticleDetails.AppLayout />
      <ArticleDetails.DesktopLayout />
    </>
  );
}

export default withAuth(ArticleDetailsPage);
