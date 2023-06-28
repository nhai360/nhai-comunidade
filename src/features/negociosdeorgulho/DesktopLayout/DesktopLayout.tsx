import { DefaultLayout } from "@/layouts/desktop";
import styles from "./styles.module.scss";

import { MainTrends } from "@/features/feed";
import { FeaturedVideoCard, VideosList } from "@/features/videos";

type Props = {
  hasSider?: boolean;
};

export function DesktopLayout({ hasSider }: Props) {
  return (
    <DefaultLayout hasSider={hasSider}>
      <></>
    </DefaultLayout>
  );
}
