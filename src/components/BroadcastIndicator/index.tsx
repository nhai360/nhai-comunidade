
import React from 'react'
import styles from './index.module.scss'


interface Props {
    isOnline: boolean;
}

const BroadcastIndicator = ({isOnline}: Props) => {
    return (
        <>
            <div className={styles.broadcastIndicator}>

            {isOnline && <>
            <span className={styles.onlineDot}></span>
            <span>AO VIVO</span>
            </>} 
            {!isOnline && <>
                <span className={styles.offlineDot}></span>
                <span>OFFLINE</span>
            </>} 
            
            </div>
        </>
    )
}

export default BroadcastIndicator;
