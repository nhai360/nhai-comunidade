import styles from './index.module.scss';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  postDate: string;
  url: string;
}

interface VideoProps {
  video: Video[];
}

const Player: React.FC<VideoProps> = ({ video }) => {
  return (
    <div className={styles.video}>
      {video.map((e) => (
        <div className={styles.videoWrapper} key={e.id}>
          <video className={styles.videoPlayer} src={e.url} controls controlsList="nodownload" />
          <span className={styles.videoTitle}>{e.title}</span>
        </div>
      ))}


    </div>
  );
};

export default Player;