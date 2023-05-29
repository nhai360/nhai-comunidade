import { DefaultLayout } from "@/layouts/desktop";
import { VideoPlayerCard } from "@/features/video-player";
import { VideosSuggestions } from "@/features/videos/VideosSuggestions";
import BtnGoBack from "@/ui/BtnGoBack";
import styles from "./styles.module.scss";

export function DesktopLayout() {
  return (
    <DefaultLayout>
      <div className={styles.contentContainer}>
        <div className={styles.btnGoBackHolder}>
          <BtnGoBack url={"/videos"} />
        </div>
        <DefaultLayout.GridWithSider>
          <VideoPlayerCard />
          <DefaultLayout.Sider>
            <VideosSuggestions />
          </DefaultLayout.Sider>
        </DefaultLayout.GridWithSider>
      </div>
    </DefaultLayout>
  );
}
