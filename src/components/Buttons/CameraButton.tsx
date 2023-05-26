
"use client";

import React, { useState } from 'react'
import styles from './index.module.scss'
import {
    BiCamera,
    BiCameraOff
} from "react-icons/bi";






const CameraButton = () => {



    const [isRecording, setIsRecording] = useState(true)

    return (
        
        <>
          <button onClick={() => setIsRecording(!isRecording)} className={styles.buttonWrapper}>
          <div className={styles.tooltip}>{isRecording ? "Desligar câmera" : "Ligar câmera"}</div>
                {isRecording &&
                <BiCamera size="1.8em" />
                }
                {!isRecording && 
                <BiCameraOff size="1.8em" style={{color: "#F97D7D"}}/>
                }
            </button>
        </>
    )
}

export default CameraButton;
