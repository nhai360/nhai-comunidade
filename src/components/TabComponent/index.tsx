"use client";
import Image from "next/image";
import styles from "./index.module.scss";
import { useState } from "react";
import ProgramSlider from "../ProgramSlider";
import ForumArea from "../ForumArea";
import { useUserFromNickname } from "@/client/users";

type IProps = {
  isSigned: boolean;
  programas: any[];
};

const TabComponent = ({ isSigned, programas }: IProps) => {
  const [active, setActive] = useState(1);

  const { user } = useUserFromNickname({
    nickname: process.env.NEXT_PUBLIC_NEGOCIOS_DE_ORGULHO,
  });

  return (
    <>
      <div className={styles.buttonWrapper}>
        <a
          className={`${active === 1 && styles.active}`}
          onClick={() => setActive(1)}
          href="javascript:void(0)"
          style={{ textTransform: "uppercase" }}
        >
          {isSigned ? "Programas" : "Cursos"}
        </a>
        <a
          className={`${active === 2 && styles.active}`}
          onClick={() => isSigned && setActive(2)}
          href={isSigned ? "javascript:void(0)" : "/auth/register"}
        >
          {isSigned ? "FÓRUM AMSTEL" : "VISITAR FÓRUM"}
        </a>
      </div>

      {active === 1 && (
        <>
          <ProgramSlider user={user as any} programas={programas} />
        </>
      )}

      {active === 2 && (
        <>
          <ForumArea user={user as any} />
        </>
      )}
    </>
  );
};

export default TabComponent;