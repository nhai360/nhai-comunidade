import React from "react";

import styles from "./styles.module.scss";

import Lottie from "react-lottie";

import "react-activity/dist/library.css";

import * as animationData from "../../../../public/notfound.json";
import { Button } from "@/ui";
import { ArrowBendUpLeft, Broadcast, HouseSimple } from "@phosphor-icons/react";
import { useRouter } from "next/router";

const LiveNotFound = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/videos");
  };

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
        <span>Vish...</span>
        <h2>Esta live não existe.</h2>
        <Button onClick={handleBack}>
          <HouseSimple size={24} /> Voltar para a plataforma
        </Button>
      </div>
    </>
  );
};

export default LiveNotFound;
