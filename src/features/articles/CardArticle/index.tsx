import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import Image from "next/image";
import { Avatar, Button, Typography } from "@/ui";
import { Article } from "@/client/articles";
import { format } from "date-fns";
import { getFirstNameAndLastName, getInitials } from "@/lib/string";
import Link from "next/link";

type Props = {
  article: Article;
};

const CardArticle = ({ article }: Props) => {
  const createdAt = format(new Date(article?.createdAt as any), "dd MMM");

  const [banner, setBanner] = useState("");
  const [description, setDescription] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    try {
      const blocks = JSON.parse(article?.content as any)?.blocks;
      setBanner(blocks?.find((b: any) => b?.type === "image")?.data?.file?.url);
      setDescription(
        blocks?.find((b: any) => b?.type === "paragraph")?.data?.text
      );
    } catch (error) {}
  }, []);

  return (
    <>
      <div className={styles.cardArticle}>
        <div>
          <Image
            src={imageError ? "/images/empty.jpg" : banner}
            alt="Article Image"
            width={0}
            height={0}
            sizes="100vw"
            onError={(e) => {
              setImageError(true);
            }}
            className={styles.articleImg}
          />

          <div className={styles.articleOwnerContainer}>
            <Avatar.Square
              size="medium"
              src={article?.author?.profilePicture?.url}
              fallback={getInitials(article?.author?.fullName)}
            />

            <div className={styles.articleOwnerInfo}>
              <Typography.Text css={{ color: "$textTitle" }}>
                {getFirstNameAndLastName(article?.author?.fullName)}
                <span className={styles?.createTime}>{`${createdAt}`}</span>
              </Typography.Text>
              <Typography.Text size="body3" color="secondary">
                @{article?.author?.nickname}
              </Typography.Text>
            </div>
          </div>
        </div>

        <h3>{`${article?.title}`}</h3>
        <p>{`${description.substring(0, 60)}`}</p>

        <Link href={`articles/${article?.id}`}>
          <Button className={styles.articleButton}>
            <h3>Ler artigo completo</h3>
          </Button>
        </Link>
      </div>
    </>
  );
};

export default CardArticle;
