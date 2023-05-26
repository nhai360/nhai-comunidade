
"use client";

import React, { useState } from 'react'
import styles from './index.module.scss'
import {
    BiPhoneOff
} from "react-icons/bi";






const CancelButton = () => {


    return (

        <>
            <button style={{backgroundColor: "#ff2424", borderColor: "#ff2424"}} id={styles.buttonCancel} className={styles.buttonWrapper}>
                <div className={styles.tooltip}>Encerrar chamada</div>

                <BiPhoneOff size="1.8em" color="#ffffff" />


            </button>
        </>
    )
}

export default CancelButton;
