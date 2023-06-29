"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import MessageItem from "../MessageItem";
import { User } from "@/client/users";

interface Props {
  isOpen: boolean;
  liveId: string;
  isOwner: boolean;
  chat: any[];
  user: User;
}

const Chat = ({ isOpen, liveId, isOwner, chat, user }: Props) => {
  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  return (
    <>
      <div className={styles.chatWrapper}>
        <div className={styles.chatHeading}>
          <span className={styles.headingTitle}>Chat</span>
          <span className={styles.headingParagraph}>
            Confira os comentários da transmissão.
          </span>
        </div>
        <div className={styles.divider} />
        <ul className={styles.messageWrapper}>
          {chat.map((data: any, key) => (
            <MessageItem
              key={key}
              comment={data}
              name={data.userName}
              message={data.message}
              nickname={data?.nickname}
              liveId={liveId}
              isOwner={isOwner}
              user={user}
            />
          ))}

          <div ref={messagesEndRef} />
        </ul>
      </div>
    </>
  );
};

export default Chat;
