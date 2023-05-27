import React from "react";

import styles from "./styles.module.scss";
import { CaretLeft } from "@phosphor-icons/react";
import Link from "next/link";

type IBtnGoBack = {
  url?: string;
};

const BtnGoBack = ({ url }: IBtnGoBack) => {
  return (
    <>
      <Link href={url ? url : "http://"}>
        <div className={styles.btnGoBack}>
          <CaretLeft size={20} />
        </div>
      </Link>
    </>
  );
};

export default BtnGoBack;
