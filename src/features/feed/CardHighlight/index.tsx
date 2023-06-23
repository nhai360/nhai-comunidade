import React from "react";

import styles from "./styles.module.scss";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";

type ICardHightlight = {
  isMobile?: boolean;
};

const CardHighlight = ({ isMobile }: ICardHightlight) => {
  return (
    <>
      <div className={styles.cardArticle}>
        <div className={styles.cardArticleHolder}>
          <div>
            <div className={styles.articleImg}></div>
          </div>
          <div>
            <p>Evento • 26.06.2023</p>
            <Link
              href={"https://nhai.com.br/semana-digital"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className={styles.title}>
                Semana Digital <ArrowUpRight size={24} />
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardHighlight;
