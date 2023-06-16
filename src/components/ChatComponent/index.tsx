"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import MessageItem from "../MessageItem";
import { handleGetChat } from "@/services/firebase/chat";

interface Props {
  isOpen: boolean;
  liveId: string;
}

const Chat = ({ isOpen, liveId }: Props) => {
  const messagesEndRef = useRef<any>(null);
  const [chat, setChat] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  useEffect(() => {
    liveId && handleGetChat(liveId, setChat);
  }, [liveId]);

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
              name={data.userName}
              message={data.message}
              nickname={data?.nickname}
            />
          ))}

          <div ref={messagesEndRef} />
        </ul>
      </div>
    </>
  );
};

export default Chat;
