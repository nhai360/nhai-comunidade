import React, { useState } from "react";
import styles from "./index.module.scss";

interface ModulesProps {
  programModule: {
    id: string;
    title: string;
    thumbnail: string;
    watched: number;
    episodes: any[];
  };
  setSelectedVideo: any;
}

const ModuleList: React.FC<ModulesProps> = ({
  programModule,
  setSelectedVideo,
}) => {
  const watchedPercent = (
    (programModule?.episodes.filter((e) => e.watched).length /
      programModule?.episodes?.length) *
    100
  ).toFixed(0);

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
            <h4 className={styles.moduleTitle}>{programModule?.title}</h4>
            <div className={styles.divider}></div>
            <div className={styles.videosInfo}>
              <span className={styles.numberVideosInfo}>
                Aula 1 de {programModule?.episodes?.length}
              </span>
            </div>
          </div>

          <div className={styles.gridVideos}>
            {!!programModule?.episodes &&
              programModule?.episodes?.map((t) => (
                <div
                  key={t.id}
                  className={styles.cardVideo}
                  onClick={() => setSelectedVideo(t)}
                >
                  <div className={styles.thumbnailWrapper}>
                    <img src={t?.thumbnail?.url as any} alt={t?.title} />
                  </div>
                  <div className={styles.content}>
                    <h3 className={styles.title}>{t?.title}</h3>
                    {/* <div className={styles.videoDuration}>0</div> */}
                    {t.watched && (
                      <span className={styles.completedBadge}>COMPLETO</span>
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
