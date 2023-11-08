import React, { useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import styles from "./slider.module.scss";
import { User } from "@/client/users";
import { useRouter } from "next/router";
import { useWindowSize } from "@/hooks/useWindowSize";
import { ICourses } from "@/@types/cousers";
import { LockSimple } from "@phosphor-icons/react";
import { GetUserProgress, type IWatchedVideo } from "@/services/firebase/progress";

interface SliderProps {
  user: User;
  cursos: ICourses[];
}

const ProgramSlider: React.FC<SliderProps> = ({ user, cursos }) => {
  const router = useRouter();
  const { width = 0 } = useWindowSize();

  const [watchedVideos, setWatchedVideos] = useState<IWatchedVideo[]>([]);

  const totalVideo = 20
  const userProgress = watchedVideos.length * 100 / totalVideo;

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

  const getProgressUser = async () => {
    if (!user?.id) return
    await GetUserProgress(user?.id, setWatchedVideos)
  }

  useEffect(() => {
    getProgressUser()
  }, [router.asPath, user?.id])

  return (
    <div className={styles.columnWrapper}>
      {cursos &&
        cursos.map((curso, indexCourse) => (
          <div key={indexCourse}>
            <span className={styles.divider}></span>

            <div
              key={curso._id}
              className={`${styles.column} ${styles.boxPadding}`}
              style={{ marginBottom: 16 }}
            >
              <div className={styles.rowHeader}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: 8,
                  }}
                >
                  <h5 className={styles.courseTitle}>{curso.name}</h5>
                  {!curso?.public && <LockSimple color="#e63432" />}
                </div>
                <p className={styles.courseInfo}>
                  {user && (
                    <>
                      <span>{userProgress}%</span> Assistido •{" "}
                    </>
                  )}
                  <span>{curso?.modules?.length}</span> Programas
                </p>
              </div>
              <Swiper
                breakpoints={swiperBreakpoints}
                slidesPerView={1.2}
                className={styles.moduleSlider}
                navigation
                modules={[Navigation]}
              >
                {curso?.modules?.map((modulo) => (
                  <SwiperSlide
                    key={modulo._id}
                    className={styles.sliderItem}
                    style={{ opacity: modulo?._id ? 1 : 0.7 }}
                    onClick={() => {
                      modulo?._id &&
                        (user
                          ? router?.push(
                              `/negocios-de-orgulho/${curso?._id}/${modulo?._id}`
                            )
                          : router.push(
                              "/auth/register/?layout=negocios-de-orgulho"
                            ));
                    }}
                  >
                    <div className={`${styles.column} ${styles.itemHover}`}>
                      {!modulo?.public && modulo?._id && (
                        <div className={styles.comingsoon}>
                          <p>Em breve</p>
                        </div>
                      )}
                      <img src={modulo.bannerUrl as any} alt={modulo.name} />
                      <div className={styles.redHeader}>
                        <div className={styles.titleWrapper}>
                          {modulo?._id ? (
                            <p className={styles.courseInfo}>
                              {!!user && (
                                <>
                                  <span>{modulo.watchedPercent}%</span>{" "}
                                  Assistido •{" "}
                                </>
                              )}
                              <span>{modulo.episodes.length}</span> episódios
                            </p>
                          ) : (
                            <p
                              className={styles.courseInfo}
                              style={{ textTransform: "uppercase" }}
                            >
                              Em breve
                            </p>
                          )}

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
          </div>
        ))}
    </div>
  );
};

export default ProgramSlider;
