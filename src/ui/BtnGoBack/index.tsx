import React from "react";

import styles from "./styles.module.scss";
import { CaretLeft } from "@phosphor-icons/react";
import Link from "next/link";

type IBtnGoBack = {
  url?: string;
  style?: any;
};

const BtnGoBack = ({ url, ...rest }: IBtnGoBack) => {
  return (
    <>
      <Link href={url || "http://"}>
        <div {...rest} className={styles.btnGoBack}>
          <CaretLeft size={20} />
        </div>
      </Link>
    </>
  );
};

export default BtnGoBack;
