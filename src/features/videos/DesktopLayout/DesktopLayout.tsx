import { DefaultLayout } from "@/layouts/desktop";
import styles from "./styles.module.scss";

import { MainTrends } from "@/features/feed";
import { FeaturedVideoCard, VideosList } from "@/features/videos";

export function DesktopLayout() {
  return (
    <DefaultLayout>
      <div className={styles.contentContainer}>
        <section className={styles.contentHolder}>
          <article className={styles.articleContainer}>
            <FeaturedVideoCard />
          </article>
          <aside className={styles.asideContainer}>
            <MainTrends />
          </aside>
        </section>
        <VideosList />
      </div>
    </DefaultLayout>
  );
}
