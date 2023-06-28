"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import MessageItem from "../MessageItem";

interface Props {
  isOpen: boolean;
  liveId: string;
  isOwner: boolean;
  chat: any[];
}

const Chat = ({ isOpen, liveId, isOwner, chat }: Props) => {
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
              commentId={data?._id}
              name={data.userName}
              message={data.message}
              nickname={data?.nickname}
              liveId={liveId}
              isOwner={isOwner}
            />
          ))}

          <div ref={messagesEndRef} />
        </ul>
      </div>
    </>
  );
};

export default Chat;
