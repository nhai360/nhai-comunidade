import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { ICourseEpisode, ICourseModule } from "@/@types/cousers";

interface ModulesProps {
  modulo: ICourseModule;
  setSelectedVideo: Dispatch<SetStateAction<ICourseEpisode | undefined>>;
  selectedVideo: ICourseEpisode;
}

const ModuleList: React.FC<ModulesProps> = ({
  modulo,
  setSelectedVideo,
  selectedVideo,
}) => {
  const watchedPercent = (
    (modulo?.episodes?.filter((e) => e.watched).length /
      modulo?.episodes?.length) *
      100 || 0
  ).toFixed(0);

  useEffect(() => {
    setSelectedVideo(modulo?.episodes[0]);
  }, [modulo]);

  return (
    <div className={styles.moduleWrapper}>
      <div className={styles.topVideo}>
        <div className={styles.topVideoList}>
          <div className={styles.moduleCard}>
            <div className={styles.rowCard}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 10H14V12H3V10ZM3 6H14V8H3V6ZM3 14H10V16H3V14ZM16 13V21L22 17L16 13Z"
                  fill="black"
                />
              </svg>

              <span className={styles.moduleWatched}>
                <strong>{watchedPercent}%</strong> assistido
              </span>
            </div>
            <h4 className={styles.moduleTitle}>{modulo?.name}</h4>
            <div className={styles.divider}></div>
            <div className={styles.videosInfo}>
              <span className={styles.numberVideosInfo}>
                Aula {selectedVideo?.order || 0} de {modulo?.episodes?.length}
              </span>
            </div>
          </div>

          <div className={styles.gridVideos}>
            {!!modulo?.episodes &&
              modulo?.episodes?.map((epi) => (
                <div
                  key={epi.videoId}
                  className={styles.cardVideo}
                  onClick={() => setSelectedVideo(epi)}
                  style={{
                    border:
                      selectedVideo?.videoId === epi?.videoId
                        ? "5px solid #dadada"
                        : "unset",
                  }}
                >
                  <div
                    className={styles.thumbnailWrapper}
                    style={{
                      backgroundImage: `url(${epi?.thumbUrl})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className={styles.content}>
                    <h3 className={styles.title}>{epi?.name}</h3>
                    {/* <div className={styles.videoDuration}>0</div> */}
                    {epi.watched && (
                      <>
                        <div className={styles.completedBadge}>
                          <span>COMPLETO</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleList;
