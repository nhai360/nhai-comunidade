import React, { useState } from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import { DeleteIcon } from "@/ui/_icons";
import DeleteChatDialog from "@/features/lives/DeleteChatDialog";
import { User } from "@/client/users";

interface Props {
  comment: any;
  name: string;
  message: string;
  nickname: string;
  isOwner?: boolean;
  liveId?: string;
  user: User;
}

const MessageItem = ({
  liveId = "",
  name,
  message,
  nickname,
  isOwner = false,
  comment,
  user,
}: Props) => {
  const [selected, setSelected] = useState<any>();
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
  return isOwner ? (
    <>
      <li
        className={styles.ownerMessageItem}
        onClick={() => setSelected(comment)}
      >
        <Link href={`/profile/${nickname}`} target="_blank">
          <span className={styles.name} style={{ color: color }}>
            {nickname}
          </span>
        </Link>
        <span className={styles.message}>{message}</span>
        <div className={styles.deleteIcon}>
          <DeleteIcon />
        </div>
      </li>
      {!!selected && (
        <DeleteChatDialog
          onClose={() => setSelected(undefined)}
          comment={selected}
          liveId={liveId}
          user={user}
        />
      )}
    </>
  ) : (
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
