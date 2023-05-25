import React from "react";

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
  return (
    <>
      <div className={styles.cardArticle}>
        <Image
          src="https://images.unsplash.com/photo-1682686578456-69ae00b0ecbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
          alt=""
          width={0}
          height={0}
          sizes="100vw"
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

        <h3>{`${article?.title}`}</h3>
        <p>{`${article?.content?.substring(0, 60)}`}</p>

        <Link href={`articles/${123123}`}>
          <Button className={styles.articleButton}>
            <h3>Ler artigo completo</h3>
          </Button>
        </Link>
      </div>
    </>
  );
};

export default CardArticle;
