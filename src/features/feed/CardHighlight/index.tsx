import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import Image from "next/image";
import { Avatar, Button, Typography } from "@/ui";
import { Article } from "@/client/articles";
import { format } from "date-fns";
import { getFirstNameAndLastName, getInitials } from "@/lib/string";
import Link from "next/link";
import { ArrowSquareOut, ArrowUpRight } from "@phosphor-icons/react";

type Props = {
  article: Article;
};

const CardHighlight = () => {
  return (
    <>
      <div className={styles.cardArticle}>
        <div
          style={{
            padding: 20,
            paddingLeft: 8,
            paddingRight: 8,
            paddingBottom: 0,
          }}
        >
          <div>
            <p>Evento</p>
            <Link
              href={"https://google.com/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className={styles.title}>
                Semana Digital <ArrowUpRight size={24} />
              </h3>
            </Link>
          </div>
          <p className={styles.date}>26.06.2023</p>

          {/* <Link href={"https://google.com/"}>
            <Button className={styles.articleButton}>
              <h3>Saiba Mais</h3>
            </Button>
          </Link> */}
        </div>
        <div>
          <div
            className={styles.articleImg}
            style={{ backgroundImage: `url('/empty.jpg)` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default CardHighlight;
