import { DefaultLayout } from "@/layouts/app";
import styles from "../styles.module.scss";

export function AppLayout() {
  return (
    <DefaultLayout>
      <DefaultLayout.Header />
      <DefaultLayout.Content>
        <section className={styles.mainContainer}>
         
        </section>
      </DefaultLayout.Content>
      <DefaultLayout.CreatePostButton />
      <DefaultLayout.BottomBar />
    </DefaultLayout>
  );
}
