import { DefaultLayout } from "@/layouts/desktop";
import styles from "../styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Avatar, Button, Tooltip, Typography } from "@/ui";
import BtnGoBack from "@/ui/BtnGoBack";
import EditorJsRenderer from "../../CreateArticleDialog/EditorJSRenderer";
import { useRouter } from "next/router";
import { useArticle } from "@/client/articles/useArticle";
import { getFirstNameAndLastName, getInitials } from "@/lib/string";
import { format } from "date-fns";
import { Calendar, PencilSimpleLine, Trash } from "@phosphor-icons/react";
import { useAuthContext } from "@/contexts";
import { useUser } from "@/client/users";
import { useState } from "react";
import DeleteArticleDialog from "../../CreateArticleDialog/DeleteArticleDialog";
import CreateArticleDialog from "../../CreateArticleDialog";

export function DesktopLayout() {
  const router = useRouter();
  const { articleId } = router.query;
  const { session } = useAuthContext();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const { article } = useArticle({
    articleId: articleId as string,
  });

  const { user } = useUser({
    id: session?.userId,
  });

  const createdAt =
    article && format(new Date(article?.createdAt as any), "MMM dd");

  console.log("article ID: ", article?.id);

  return (
    <DefaultLayout>
      {showModalDelete ? (
        <DeleteArticleDialog
          onClose={() => setShowModalDelete(false)}
          articleId={article?.id}
        />
      ) : null}

      {showModalEdit ? (
        <CreateArticleDialog
          type="edit"
          editData={article?.content}
          onClose={() => setShowModalEdit(false)}
        />
      ) : null}

      <div className={styles.contentContainer}>
        <div className={styles.btnGoBackHolder}>
          <BtnGoBack url={"/articles"} />
        </div>
        <section className={styles.contentHolder}>
          <article className={styles.articleContainer}>
            <div className={styles.articleHeader}>
              <div className={styles.articleOwnerContainer}>
                <div className={styles.articleOwnerInfo}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Avatar.Square
                      size="small"
                      src={article?.author?.profilePicture?.url}
                      fallback={getInitials(article?.author?.fullName)}
                    />

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Typography.Text
                        css={{ color: "$textTitle", fontWeight: 500 }}
                      >
                        {getFirstNameAndLastName(article?.author?.fullName)} •
                        <Typography.Text
                          size="body3"
                          color="primary"
                          style={{ marginLeft: 4 }}
                        >
                          @{article?.author?.nickname}
                        </Typography.Text>
                      </Typography.Text>

                      <span
                        className={styles?.createTime}
                      >{`${createdAt}`}</span>
                    </div>
                  </div>
                  {article?.author?.id === user?.id && (
                    <div style={{ display: "flex", gap: 16 }}>
                      <Tooltip message="Deletar Artigo" position="bottom">
                        <Button
                          icon
                          variant="transparent"
                          onClick={() => setShowModalDelete(true)}
                        >
                          <Trash size={24} />
                        </Button>
                      </Tooltip>
                      <Tooltip message="Editar Artigo" position="bottom">
                        <Button
                          icon
                          variant="transparent"
                          onClick={() => setShowModalEdit(true)}
                        >
                          <PencilSimpleLine size={24} />
                        </Button>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {article && (
              <EditorJsRenderer data={JSON.parse(article?.content as any)} />
            )}
          </article>
          <aside className={styles.asideContainer}>
            <div className={styles.asideBox}>
              <Avatar.Square
                size="large"
                src={article?.author?.profilePicture?.url}
                fallback={getInitials(article?.author?.fullName)}
              />
              <div className={styles.asideInfo}>
                <h2>{getFirstNameAndLastName(article?.author?.fullName)}</h2>
                <h4>06 artigos publicados</h4>
              </div>
              <div style={{ width: "100%" }}>
                <Link href={`/articles`}>
                  <Button className={styles.asideButton}>
                    <h3>Mais artigos</h3>
                  </Button>
                </Link>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </DefaultLayout>
  );
}
