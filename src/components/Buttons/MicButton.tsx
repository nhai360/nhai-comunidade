"use client";

import React, { useState } from 'react'
import styles from './index.module.scss'
import {
    BiMicrophone,
    BiMicrophoneOff
} from "react-icons/bi";





const MicButton = () => {

   const [isMuted, setIsMuted] = useState(false)

    return (
        
        <>
          <button onClick={() => setIsMuted(!isMuted)} className={styles.buttonWrapper}>
          <div className={styles.tooltip}>{isMuted ? "Ligar microfone" : "Desligar microfone"}</div>
                {isMuted && <BiMicrophoneOff size="1.8em" style={{color: "#F97D7D"}} />}
                {!isMuted && <BiMicrophone size="1.8em" />}
            </button>
        </>
    )
}

export default MicButton;
