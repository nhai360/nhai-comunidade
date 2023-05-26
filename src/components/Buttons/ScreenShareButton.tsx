"use client";

import React, { useState } from 'react'
import styles from './index.module.scss'
import {
    BiSlideshow,
} from "react-icons/bi";


interface Props {
    

}



const ScreenShareButton = ({}: Props) => {


    const [isSharing, setIsSharing] = useState(false)

    return (
        
        <>
          <button onClick={() => setIsSharing(!isSharing)} id={styles.ScreenSharing} className={styles.buttonWrapper} style={{backgroundColor: isSharing ? "#202020" : "#fff", borderColor: isSharing ? "#202020" : "#b6b6b6",}}>
            <div className={styles.tooltip}>{isSharing ? "Parar compartilhamento" : "Compartilhar tela"}</div>
                {isSharing &&
                <BiSlideshow size="1.8em" color={isSharing ? "#fff" : "#202020"} />
                }
                {!isSharing && 
                <BiSlideshow size="1.8em"  />
                }
            </button>
        </>
    )
}

export default ScreenShareButton;
