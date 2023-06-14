import React from "react";

import styles from "./styles.module.scss";

import Lottie from "react-lottie";

import "react-activity/dist/library.css";

import * as animationData from "../../../../public/streamlott.json";
import { Button } from "@/ui";
import { Broadcast, SignIn } from "@phosphor-icons/react";
import { Live } from "@/client/lives";

interface IJoinLive {
  live: Live;
  handleSubmit: () => void;
}

const JoinLive = ({ handleSubmit, live }: IJoinLive) => {
  return (
    <>
      <div className={styles.spaceGreetings}>
        <Lottie
          options={{
            animationData: animationData,
            loop: true,
            autoplay: true,
          }}
          height={200}
          width={200}
        />
        <span>SEJA BEM-VINDO</span>
        <h2>
          <Broadcast size={20} color="red" /> {live?.title}
        </h2>
        <Button onClick={handleSubmit}>
          Preparar transmissão <SignIn size={20} />{" "}
        </Button>
      </div>
    </>
  );
};

export default JoinLive;
