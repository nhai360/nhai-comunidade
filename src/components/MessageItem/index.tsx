
import React from 'react'
import styles from './index.module.scss'


interface Props {
    name: string;
    message: string;
    color?: string;
}

const MessageItem = ({ name, message, color }: Props) => {
    return (
        <li className={styles.messageItem}>
            <span className={styles.name} style={{color: color}}>
                {name}
            </span>
            <span className={styles.message}>
                {message}
            </span>
        </li>
    )
}

export default MessageItem;
