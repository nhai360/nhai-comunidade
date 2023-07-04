import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import styles from "./slider.module.scss";
import { useVideosFromUser } from "@/client/videos";
import { useUserPlaylists } from "@/client/videos/useUserPlaylists";
import { User } from "@/client/users";
import { handleProgramas } from "@/services/firebase/programas";
import { useRouter } from "next/router";
import { IWatchedVideo } from "@/services/firebase/progress";
import { limitText } from "@/features/lives/utils";
import { useWindowSize } from "@/hooks/useWindowSize";
import { ICourses } from "@/@types/cousers";

interface SliderProps {
  user: User;
  cursos: ICourses[];
}

const ProgramSlider: React.FC<SliderProps> = ({ user, cursos }) => {
  const router = useRouter();
  const { width = 0 } = useWindowSize();

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

  return (
    <div className={styles.columnWrapper}>
      {cursos &&
        cursos.map((curso) => (
          <>
            <span className={styles.divider}></span>

            <div
              key={curso._id}
              className={`${styles.column} ${styles.boxPadding}`}
              style={{ marginBottom: 16 }}
            >
              <div className={styles.rowHeader}>
                <h5 className={styles.courseTitle}>{curso.name} </h5>
                <p className={styles.courseInfo}>
                  {user && (
                    <>
                      <span>{curso.watchedPercent}%</span> Assistido •{" "}
                    </>
                  )}
                  <span>{curso?.modules?.length}</span> Módulos
                </p>
              </div>
              <Swiper
                breakpoints={swiperBreakpoints}
                slidesPerView={1.2}
                className={styles.moduleSlider}
              >
                {curso?.modules?.map((modulo) => (
                  <SwiperSlide
                    key={modulo._id}
                    className={styles.sliderItem}
                    onClick={() => {
                      user
                        ? router?.push(
                            `/negocios-de-orgulho/${curso?._id}/${modulo?._id}`
                          )
                        : router.push("/auth/register");
                    }}
                  >
                    <div className={`${styles.column} ${styles.itemHover}`}>
                      <img src={modulo.bannerUrl as any} alt={modulo.name} />
                      <div className={styles.redHeader}>
                        <div className={styles.titleWrapper}>
                          <p className={styles.courseInfo}>
                            {!!user && (
                              <>
                                <span>{modulo.watchedPercent}%</span> Assistido
                                •{" "}
                              </>
                            )}
                            <span>{modulo.episodes.length}</span> episódios
                          </p>

                          <h3>{modulo.name}</h3>
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
