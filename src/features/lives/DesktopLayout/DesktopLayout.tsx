import { DefaultLayout } from "@/layouts/desktop";
import styles from "./styles.module.scss";
import { useLiveContext } from "@/contexts/LiveContext";
import { useRouter } from "next/router";
import { LiveCard } from "../LiveCard";

export function DesktopLayout() {
  const { lives } = useLiveContext();

  return (
    <DefaultLayout hasSider={false}>
      <div className={styles.contentContainer}>
        <h2 className={styles.pageTitle}>Suas transmissões</h2>
        {lives?.map((live, index) => (
          <LiveCard key={index} live={live} />
        ))}
      </div>
    </DefaultLayout>
  );
}
