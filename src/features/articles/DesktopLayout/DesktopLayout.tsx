import { DefaultLayout } from "@/layouts/desktop";
import styles from '../styles.module.scss'
import CardArticle from "../CardArticle";


export function DesktopLayout() {
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
          <CardArticle />
          <CardArticle />
          <CardArticle />
          <CardArticle />
          <CardArticle />
          <CardArticle />
        </section>
      </div>
    </DefaultLayout>
  );
}
