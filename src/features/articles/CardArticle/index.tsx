import React from "react";

import styles from "./styles.module.scss";
import Image from "next/image";
import { Button } from "@/ui";

const CardArticle = () => {
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

        <h3>
          Explorando o potencial da colaboração em uma comunidade diversificada
        </h3>
        <p>
          Experimente o poder da colaboração entre indivíduos de diferentes
          histórias e ideias inovadoras enquanto faz parte de nossa comunidade.
        </p>

        <Button className={styles.articleButton}>
          <h3>Ler artigo completo</h3>
        </Button>
      </div>
    </>
  );
};

export default CardArticle;
