import { DefaultLayout } from "@/layouts/app";
import styles from "../styles.module.scss";
import { useRouter } from "next/router";
import { useArticle } from "@/client/articles/useArticle";
import EditorJsRenderer from "../../CreateArticleDialog/EditorJSRenderer";
import BtnGoBack from "@/ui/BtnGoBack";
import { Avatar, Button, Tooltip, Typography } from "@/ui";
import { getFirstNameAndLastName, getInitials } from "@/lib/string";
import { format } from "date-fns";
import { useUser } from "@/client/users";
import { useAuthContext } from "@/contexts";

export function AppLayout() {
  const router = useRouter();
  const { articleId } = router.query;
  const { session } = useAuthContext();
  const { article } = useArticle({
    articleId: articleId as string,
  });

  const { user } = useUser({
    id: session?.userId,
  });

  const createdAt =
    article && format(new Date(article?.createdAt as any), "MMM dd");

  return (
    <DefaultLayout>
      <DefaultLayout.Header />
      <DefaultLayout.Content>
        <div className={styles.btnGoBackHolder}>
          <BtnGoBack url={"/articles"} />
        </div>

        <section className={styles.mobileContainer}>
          <div style={{ display: "flex", gap: 8, margin: "1rem 0" }}>
            <Avatar.Square
              size="small"
              src={article?.author?.profilePicture?.url}
              fallback={getInitials(article?.author?.fullName)}
            />

            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography.Text css={{ color: "$textTitle", fontWeight: 500 }}>
                {getFirstNameAndLastName(article?.author?.fullName)} •
                <Typography.Text
                  size="body3"
                  color="primary"
                  style={{ marginLeft: 4 }}
                >
                  @{article?.author?.nickname}
                </Typography.Text>
              </Typography.Text>

              <span className={styles?.createTime}>{`${createdAt}`}</span>
            </div>
          </div>

          {article && (
            <EditorJsRenderer data={JSON.parse(article?.content as any)} />
          )}
        </section>
      </DefaultLayout.Content>
      <DefaultLayout.CreatePostButton />
      <DefaultLayout.BottomBar />
    </DefaultLayout>
  );
}
