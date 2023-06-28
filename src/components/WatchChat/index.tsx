"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import MessageItem from "../MessageItem";
import {
  handleCreateChatMessage,
  handleCreateLiveViewer,
  handleGetChat,
} from "@/services/firebase/chat";
import { User } from "@/client/users";
import { Avatar, Button, Field } from "@/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateChatParams, CreateChatResolver, Live } from "@/client/lives";
import { toast } from "react-toastify";
import * as S from "./ChatForm.styles";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { getInitials } from "@/lib/string";

interface Props {
  liveId: string;
  user: User;
  live: Live;
}

export const WatchChat = ({ liveId, user, live }: Props) => {
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
    live?.author?.id === user?.id &&
      console.log(`Métricas: 💬${chat?.length} 👀 ${"0"}`);
  }, [chat]);

  useEffect(() => {
    liveId && handleGetChat(liveId, setChat);
    liveId &&
      handleCreateLiveViewer(liveId, {
        fullName: user?.fullName,
        nickname: user?.nickname,
        userId: user?.id,
      });
  }, [liveId]);

  const handleComment = async ({ message }: CreateChatParams) => {
    if (message?.length > 0) {
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Avatar.Square
              alt={"live-author-picture"}
              src={live.author?.profilePicture?.url}
              fallback={getInitials(live.author?.fullName)}
              level={live.author?.score?.level}
              size={"small"}
              css={{
                "@laptop": {
                  width: "42px",
                  height: "42px",
                },
                "@mobile": {
                  width: "42px",
                  height: "42px",
                  borderRadius: "42px",
                },
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <span className={styles.headingTitle}> {live?.title}</span>
              <span className={styles.headingParagraph}>
                @{live?.author?.nickname}{" "}
              </span>
            </div>
          </div>

          <span className={styles.description}>{live?.description}</span>
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
              isOwner={user?.role?.name === "ADMIN"}
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
