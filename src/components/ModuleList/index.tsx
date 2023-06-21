import React from 'react';
import styles from './index.module.scss';

interface Modules {
    id: number;
    title: string;
    thumbnail: string;
    watchedPercentage: number;
    episodes: number;
    watchedEpisodes: number;
    duration: number;
    videos: videos[];
}
interface videos {
    id: number;
    title: string;
    thumbnail: string;
    watchedPercentage: number;
    duration: number;
}

interface ModulesProps {
    modules: Modules[];
}

const ModuleList: React.FC<ModulesProps> = ({ modules }) => {
    return (

        <div className={styles.moduleWrapper}>
            <div className={styles.topVideo}>
                <div className={styles.topVideoList}>
                    {modules.map((e) => (
                        <div key={e.id}>
                            <div className={styles.moduleCard}>
                                <div className={styles.rowCard}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 10H14V12H3V10ZM3 6H14V8H3V6ZM3 14H10V16H3V14ZM16 13V21L22 17L16 13Z" fill="black" />
                                    </svg>


                                    <span className={styles.moduleWatched}><strong>{e.watchedPercentage}</strong> assistido</span>
                                </div>
                                <span className={styles.moduleTitle}>
                                    {e.title}
                                </span>
                                <div className={styles.divider}></div>
                                <div className={styles.videosInfo}>
                                    <span className={styles.numberVideosInfo}>Aula 1 de {e.episodes}</span>
                                    •
                                    <span className={styles.minutesInfo}>
                                        {e.duration} minutos
                                    </span>
                                </div>
                            </div>

                            {e.videos.map((t) => (
                                <div key={t.id} className={styles.cardVideo}>
                                    <div className={styles.thumbnailWrapper}>
                                        <img src={t.thumbnail} alt={t.title} />
                                    </div>
                                    <span className={styles.title}>{t.title}</span>
                                    <div className={styles.videoDuration}>{t.duration}
                                    </div>
                                    {e.watchedPercentage === 100 && <span className={styles.completedBadge}>
                                        COMPLETO
                                    </span>}

                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>



    );
};

export default ModuleList;