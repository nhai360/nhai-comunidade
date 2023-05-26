import { DefaultLayout } from "@/layouts/desktop";
import styles from "../styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/ui";
import BtnGoBack from "@/ui/BtnGoBack";
import EditorJsRenderer from "../../CreateArticleDialog/EditorJSRenderer";

const data = {
  time: 685078475609,
  blocks: [
    {
      id: "FOczC1j-dn",
      type: "header",
      data: {
        text: "Testinho",
        level: 1,
      },
    },
    {
      id: "c3IDSK42Vm",
      type: "paragraph",
      data: {
        text: "adasdas",
      },
    },
    {
      id: "NWile-HyKZ",
      type: "image",
      data: {
        file: {
          url: "https://contai-media.nyc3.cdn.digitaloceanspaces.com/contaiapp_2023_05_26_41fa02d988217773.jpg",
        },
        caption: "sdsds",
        withBorder: false,
        stretched: true,
        withBackground: true,
      },
    },
  ],
  version: "2.27.0",
};

export function DesktopLayout() {
  return (
    <DefaultLayout>
      <div className={styles.contentContainer}>
        <BtnGoBack />
        <section className={styles.contentHolder}>
          <article className={styles.articleContainer}>
            <div className={styles.articleHeader}>
              <Image
                src="https://images.unsplash.com/photo-1682686578456-69ae00b0ecbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                className={styles.articleOwner}
              />

              <div className={styles.articleOwnerInfo}>
                <h4>
                  Raquel Virgínia{" "}
                  <span
                    className={styles.userRole}
                    style={{ backgroundColor: "#D9F2FF", color: "#01A1FF" }}
                  >
                    ADMIN
                  </span>{" "}
                  <span>23 Jan</span>
                </h4>
                <span>Nhaí</span>
              </div>
            </div>
            {data && <EditorJsRenderer data={data} />}
          </article>
          <aside className={styles.asideContainer}>
            <div className={styles.asideBox}>
              <Image
                src="https://images.unsplash.com/photo-1682686578456-69ae00b0ecbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                className={styles.articleOwner}
              />
              <div className={styles.asideInfo}>
                <h2>Raquel Virgínia</h2>
                <h4>06 artigos publicados</h4>
              </div>
              <Link href={`/articles`}>
                <Button className={styles.asideButton}>
                  <h3>Ler artigo completo</h3>
                </Button>
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </DefaultLayout>
  );
}
