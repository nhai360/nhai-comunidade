import { DefaultLayout } from "@/layouts/desktop";
import styles from "../styles.module.scss";
import CardArticle from "../CardArticle";
import { useArticles } from "@/client/articles";

export function DesktopLayout() {
  const { articles } = useArticles();

  return (
    <DefaultLayout>
      <div className={styles.contentContainer}>
        <section className={styles.infoHeader}>
          <h2>Aqui estão alguns artigos que preparamos para você!</h2>
          <p>
            Experimente o poder da colaboração entre indivíduos de diferentes
            histórias e ideias inovadoras enquanto faz parte de nossa
            comunidade.
          </p>
        </section>
        <section className={styles.gridArticlesContainer}>
          {articles?.map((article: any, index: any) => (
            <CardArticle article={article} key={index} />
          ))}
        </section>
      </div>
    </DefaultLayout>
  );
}
