import { DefaultLayout } from "@/layouts/app";
import styles from "../styles.module.scss";
import CardArticle from "../CardArticle";
import { useArticleContext } from "@/contexts/ArticleContext";

export function AppLayout() {
  const { articles } = useArticleContext();
  return (
    <DefaultLayout>
      <DefaultLayout.Header />
      <DefaultLayout.Content>
        <section className={styles.gridArticlesContainer}>
          {articles?.map((article: any, index: any) => (
            <CardArticle article={article} key={index} />
          ))}
        </section>
      </DefaultLayout.Content>
      <DefaultLayout.CreatePostButton />
      <DefaultLayout.BottomBar />
    </DefaultLayout>
  );
}
