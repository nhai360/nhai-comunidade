import { DefaultLayout } from "@/layouts/app";
import styles from "../styles.module.scss";
import CardArticle from "../CardArticle";

export function AppLayout() {
  return (
    <DefaultLayout>
      <DefaultLayout.Header />
      <DefaultLayout.Content>
        <section className={styles.gridArticlesContainer}>
          <CardArticle />
          <CardArticle />
          <CardArticle />
          <CardArticle />
          <CardArticle />
          <CardArticle />
        </section>
      </DefaultLayout.Content>
      <DefaultLayout.CreatePostButton />
      <DefaultLayout.BottomBar />
    </DefaultLayout>
  );
}
