import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import styles from "./slider.module.scss";
import { useVideosFromUser } from "@/client/videos";
import { useUserPlaylists } from "@/client/videos/useUserPlaylists";
import { User } from "@/client/users";
import { handleProgramas } from "@/services/firebase/programas";
import { useRouter } from "next/router";

interface Curso {
  id: number;
  title: string;
  watched: number;
  modules: number;
  modulos: Modulo[];
}

interface Modulo {
  id: number;
  title: string;
  thumbnail: string;
  watched: number;
  episodes: number;
}

interface SliderProps {
  user: User;
  programas: any[];
}

const ProgramSlider: React.FC<SliderProps> = ({ user, programas }) => {
  const router = useRouter();

  const { userplaylists } = useUserPlaylists({
    userId: user?.id,
  });

  const { videos } = useVideosFromUser({
    nickname: process.env.NEXT_PUBLIC_NEGOCIOS_DE_ORGULHO,
  });

  const validPlaylists = userplaylists?.filter((a) => a?.videos?.length > 0);
  const validOtherVideos = videos?.filter((a) => !a?.playlist);

  const swiperBreakpoints = {
    320: {
      slidesPerView: 1.2,
      spaceBetween: 5,
    },
    500: {
      slidesPerView: 1.5,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1366: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1920: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  };

  const cursos = programas?.map((programa) => {
    return {
      id: 0,
      title: programa?.name,
      watched: 10,
      modules: programa?.modules?.length,
      modulos: programa?.modules?.map((id: string) => {
        const findPlaylist = validPlaylists?.find((v) => v?.id === id);

        return {
          id: id,
          title: findPlaylist?.title,
          thumbnail: findPlaylist?.videos[0]?.thumbnail?.url,
          watched: 0,
          episodes: findPlaylist?.videos?.length,
        };
      }),
    };
  });

  return (
    <div className={styles.columnWrapper}>
      {cursos &&
        cursos.map((curso) => (
          <>
            <span className={styles.divider}></span>

            <div
              key={curso.id}
              className={`${styles.column} ${styles.boxPadding}`}
            >
              <div className={styles.rowHeader}>
                <h5 className={styles.courseTitle}>{curso.title} </h5>
                <p className={styles.courseInfo}>
                  {user && (
                    <>
                      <span>{`0%`}</span> Assistido •{" "}
                    </>
                  )}
                  <span>{curso?.modulos?.length}</span> Módulos
                </p>
              </div>
              <Swiper
                breakpoints={swiperBreakpoints}
                slidesPerView={1.2}
                className={styles.moduleSlider}
              >
                {curso?.modulos?.map((modulo: any) => (
                  <SwiperSlide
                    key={modulo.id}
                    className={styles.sliderItem}
                    onClick={() => {
                      user
                        ? router?.push(`/negocios-de-orgulho/${modulo?.id}`)
                        : router.push("/auth/register");
                    }}
                  >
                    <div className={`${styles.column} ${styles.itemHover}`}>
                      <img src={modulo.thumbnail as any} alt={modulo.title} />
                      <div className={styles.redHeader}>
                        <div className={styles.titleWrapper}>
                          <p className={styles.courseInfo}>
                            {!!user && (
                              <>
                                <span>{`0%`}</span> Assistido •{" "}
                              </>
                            )}
                            <span>{modulo.episodes}</span> episódios
                          </p>

                          <h3>{modulo.title}</h3>
                        </div>
                        <svg
                          width="13"
                          height="15"
                          viewBox="0 0 13 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.3081 7.40174L0.532404 14.2004L0.532405 0.603032L12.3081 7.40174Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        ))}
    </div>
  );
};

export default ProgramSlider;
