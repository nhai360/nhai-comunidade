import React from "react";

import styles from "./styles.module.scss";
import Image from "next/image";

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
          style={{ width: "100%", height: 400, objectFit: "cover" }}
        />

        <div></div>

        <h3>
          Explorando o potencial da colaboração em uma comunidade diversificada
        </h3>
        <p></p>
      </div>
    </>
  );
};

export default CardArticle;
