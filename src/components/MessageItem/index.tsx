import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";

interface Props {
  name: string;
  message: string;
  nickname: string;
}

const MessageItem = ({ name, message, nickname }: Props) => {
  function gerarCorAleatoria(string: string): string {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    const corHexadecimal = ((hash >> 0) & 0xffffff).toString(16);
    const cor =
      "#" + "000000".substring(0, 6 - corHexadecimal.length) + corHexadecimal;
    return cor;
  }

  const color = gerarCorAleatoria(nickname);
  return (
    <li className={styles.messageItem}>
      <Link href={`/profile/${nickname}`} target="_blank">
        <span className={styles.name} style={{ color: color }}>
          {nickname}
        </span>
      </Link>
      <span className={styles.message}>{message}</span>
    </li>
  );
};

export default MessageItem;
