import { DefaultLayout } from "@/layouts/app";
import styles from "../styles.module.scss";
import CardArticle from "../CardArticle";
import { useArticles } from "@/client/articles";

export function AppLayout() {
  const { articles } = useArticles();
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
