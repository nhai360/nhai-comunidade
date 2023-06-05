import { DefaultLayout } from "@/layouts/desktop";
import styles from "../styles.module.scss";
import CardArticle from "../CardArticle";
import { useArticleContext } from "@/contexts/ArticleContext";
import { ListLineParagraphSquareIcon } from "@/ui/_icons";

export function DesktopLayout() {
  const { articles } = useArticleContext();

  return (
    <DefaultLayout>
      <div className={styles.contentContainer}>
        <section className={styles.infoHeader}>
          <ListLineParagraphSquareIcon size={32} />
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
