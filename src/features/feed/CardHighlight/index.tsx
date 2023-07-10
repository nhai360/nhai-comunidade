import React from "react";

import styles from "./styles.module.scss";
import Link from "next/link";
import { ArrowUpRight, Queue } from "@phosphor-icons/react";

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
            <Queue color={"black"} size={16} />
            <p>Cresça seu negócio.</p>
            <Link
              href={"https://contaiapp.com/negocios-de-orgulho"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className={styles.title} style={{ fontFamily: "RingBold" }}>
                Negócios de Orgulho <ArrowUpRight color="red" size={24} />
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardHighlight;
