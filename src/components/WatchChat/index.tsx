"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import MessageItem from "../MessageItem";
import {
  handleCreateChatMessage,
  handleGetChat,
} from "@/services/firebase/chat";
import { User } from "@/client/users";
import { Button, Field } from "@/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateChatParams, CreateChatResolver } from "@/client/lives";
import { toast } from "react-toastify";
import * as S from "./ChatForm.styles";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { invalidChatText } from "@/lib/utils";

interface Props {
  liveId: string;
  user: User;
}

export const WatchChat = ({ liveId, user }: Props) => {
  const messagesEndRef = useRef<any>(null);
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
  } = useForm<CreateChatParams>({
    resolver: zodResolver(CreateChatResolver),
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  useEffect(() => {
    liveId && handleGetChat(liveId, setChat);
  }, [liveId]);

  const handleComment = async ({ message }: CreateChatParams) => {
    const block = invalidChatText(message);
    if (message?.length > 0 && !block) {
      setLoading(true);
      await handleCreateChatMessage(liveId, {
        message: message,
        userId: user?.id,
        userName: user?.fullName,
        nickname: user?.nickname,
      }).catch(() => {
        toast.error("Não foi possível enviar seu comentário :(");
      });
      resetField("message");
      setLoading(false);
    }
  };

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
            />
          ))}

          <div ref={messagesEndRef} />
        </ul>
        <S.FormContainer onSubmit={handleSubmit(handleComment)}>
          <Field.Input placeholder="Mensagem" {...register("message")} />
          <Button
            loading={loading}
            type="submit"
            icon={"true"}
            onClick={() => handleSubmit(handleComment)()}
            style={{ minWidth: 48, height: 48 }}
          >
            <PaperPlaneTilt size={20} color={"#fff"} />
          </Button>
        </S.FormContainer>
      </div>
    </>
  );
};
