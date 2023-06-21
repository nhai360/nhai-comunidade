"use client";
import Image from "next/image";
import styles from "./index.module.scss";
import { useState } from "react";
import ProgramSlider from "../ProgramSlider";
import ForumArea from "../ForumArea";

type IProps = {
  isSigned: boolean;
};

const TabComponent = ({ isSigned }: IProps) => {
  const [active, setActive] = useState(1);

  const cursos = [
    {
      id: 0,
      title: "GESTÃO DE NEGÓCIOS",
      watched: 10,
      modules: 4,
      modulos: [
        {
          id: 0,
          title: "ADMINISTRAÇÃO DE NEGÓCIOS",
          thumbnail: "image-1.png",
          watched: 10,
          episodes: 4,
        },
        {
          id: 1,
          title: "ADMINISTRAÇÃO DE NEGÓCIOS",
          thumbnail: "image-1.png",
          watched: 10,
          episodes: 4,
        },
        {
          id: 1,
          title: "ADMINISTRAÇÃO DE NEGÓCIOS",
          thumbnail: "image-1.png",
          watched: 10,
          episodes: 4,
        },
        {
          id: 1,
          title: "ADMINISTRAÇÃO DE NEGÓCIOS",
          thumbnail: "image-1.png",
          watched: 10,
          episodes: 4,
        },
        {
          id: 1,
          title: "ADMINISTRAÇÃO DE NEGÓCIOS",
          thumbnail: "image-1.png",
          watched: 10,
          episodes: 4,
        },
        {
          id: 1,
          title: "ADMINISTRAÇÃO DE NEGÓCIOS",
          thumbnail: "image-1.png",
          watched: 10,
          episodes: 4,
        },
        {
          id: 1,
          title: "ADMINISTRAÇÃO DE NEGÓCIOS",
          thumbnail: "image-1.png",
          watched: 10,
          episodes: 4,
        },
        {
          id: 1,
          title: "ADMINISTRAÇÃO DE NEGÓCIOS",
          thumbnail: "image-1.png",
          watched: 10,
          episodes: 4,
        },
      ],
    },
    {
      id: 2,
      title: "ORGANIZAÇÃO É VIDA",
      watched: 10,
      modules: 4,
      modulos: [
        {
          id: 0,
          title: "ADMINISTRAÇÃO DE NEGÓCIOS",
          thumbnail: "image-1.png",
          watched: 10,
          episodes: 4,
        },
        {
          id: 1,
          title: "ADMINISTRAÇÃO DE NEGÓCIOS",
          thumbnail: "image-1.png",
          watched: 10,
          episodes: 4,
        },
        {
          id: 1,
          title: "ADMINISTRAÇÃO DE NEGÓCIOS",
          thumbnail: "image-1.png",
          watched: 10,
          episodes: 4,
        },
        {
          id: 1,
          title: "ADMINISTRAÇÃO DE NEGÓCIOS",
          thumbnail: "image-1.png",
          watched: 10,
          episodes: 4,
        },
        {
          id: 1,
          title: "ADMINISTRAÇÃO DE NEGÓCIOS",
          thumbnail: "image-1.png",
          watched: 10,
          episodes: 4,
        },
        {
          id: 1,
          title: "ADMINISTRAÇÃO DE NEGÓCIOS",
          thumbnail: "image-1.png",
          watched: 10,
          episodes: 4,
        },
      ],
    },
  ];

  const posts = [
    {
      id: 0,
      thumbnail: "image-1.png",
      title: "Como construir uma empresa inclusiva como empreendedor LGBT.",
      postDate: "Há 3 horas",
    },
    {
      id: 0,
      thumbnail: "image-1.png",
      title: "Como construir uma empresa inclusiva como empreendedor LGBT.",
      postDate: "Há 3 horas",
    },
  ];

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
          href={isSigned ? "javascript:void(0)" : "/register"}
        >
          {isSigned ? "FÓRUM AMSTEL" : "VISITAR FÓRUM"}
        </a>
      </div>

      {active === 1 && (
        <>
          <ProgramSlider cursos={cursos} />
        </>
      )}

      {active === 2 && (
        <>
          <ForumArea posts={posts} />
        </>
      )}
    </>
  );
};

export default TabComponent;
