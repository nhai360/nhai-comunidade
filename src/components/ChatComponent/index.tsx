
"use client";

import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import MessageItem from '../MessageItem';


interface Props {
    isOpen: boolean;
    messages: [];
}



const Chat = ({ isOpen, messages }: Props) => {

    const messagesEndRef = useRef<any>(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  

    useEffect(() => {
        scrollToBottom()
      }, [messages]);
    

    return (
        
        <>
            <div className={styles.chatWrapper}>
                <div className={styles.chatHeading}>
                     <span className={styles.headingTitle}>Chat</span>
                     <span className={styles.headingParagraph}>Confira os comentários da transmissão.</span>
                </div>
                <div className={styles.divider} />
                <ul className={styles.messageWrapper}>

                   <MessageItem color="#ff2424" name="Natan" message="Hey guys, whats the topic of this week?" />







                   <div ref={messagesEndRef} />
                </ul>


            </div>
        </>
    )
}

export default Chat;
