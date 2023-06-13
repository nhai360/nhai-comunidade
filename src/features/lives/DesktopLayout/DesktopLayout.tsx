import { DefaultLayout } from "@/layouts/desktop";
import styles from "./styles.module.scss";

export function DesktopLayout() {
  return (
    <DefaultLayout hasSider={false}>
      <div className={styles.contentContainer}>
        <h2 className={styles.pageTitle}>Suas transmissões</h2>
      </div>
    </DefaultLayout>
  );
}
