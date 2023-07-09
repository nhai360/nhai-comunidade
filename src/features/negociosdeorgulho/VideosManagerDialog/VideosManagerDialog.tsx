import styles from "./styles.module.scss";
import Switch from "react-switch";

import { Dialog, Divider, Tooltip } from "@/ui";

import * as S from "./VideosManagerDialog.styles";
import { useState } from "react";
import { ICourseEpisode, ICourseModule, ICourses } from "@/@types/cousers";
import { handleEditProgram } from "@/services/firebase/courses";
import { toast } from "react-toastify";
import { UploadVideoDialog } from "@/features/videos";
import { SearchIcon, TrashIcon } from "@/ui/_icons";
import { useDeleteVideo } from "@/client/videos/useDeleteVideo";
import { QuestionManagerDialog } from "../QuestionManagerDialog";
import { List, ListMagnifyingGlass, Video } from "@phosphor-icons/react";

type Props = {
  onClose: () => void;
  courseId: string;
  moduleId: string;
  courses: ICourses[];
};

export function VideosManagerDialog({
  onClose,
  courseId,
  courses,
  moduleId,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [showNewVideo, setShowNewVideo] = useState(false);
  const [videoQuestion, setVideoQuestion] = useState<ICourseEpisode>();
  const course = courses.find((c) => c?._id === courseId);

  const modulo = course?.modules.find((m) => m?._id === moduleId);
  const { deleteVideo } = useDeleteVideo();

  const handleDeleteVideo = (videoId: string) => {
    if (course && modulo && videoId) {
      deleteVideo(
        {
          videoId: videoId,
        },
        {
          onSuccess: async () => {
            toast.success("Episódio excluído!");
            await handleEditProgram({
              ...course,
              modules: [
                ...course?.modules.map((a) => {
                  return a?._id === modulo?._id
                    ? {
                        ...modulo,
                        episodes: modulo?.episodes?.filter(
                          (v) => v?.videoId !== videoId
                        ),
                        updatedAt: new Date(),
                      }
                    : a;
                }),
              ],
            }).catch((err) => {
              toast.error("Falha ao excluir episódio");
              console.log("Error =>", err);
            });
          },
          onError: () => {
            toast.error(
              "Não foi possível excluir este episódio. Tente novamente."
            );
          },
        }
      );
    }
  };

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <Dialog.Content style={{ borderRadius: 0, border: "none" }}>
          <S.QuestionHeader>
            <S.QuestionHeaderTitleContainer>
              <S.QuestionHeaderTitle
                style={{ display: "flex", gap: 4, alignItems: "center" }}
              >
                {" "}
                <List size={32} />
                {modulo?.name}
              </S.QuestionHeaderTitle>
              <S.QuestionHeaderSubtitle>
                Gerencie abaixo os episódios deste módulo.
              </S.QuestionHeaderSubtitle>
            </S.QuestionHeaderTitleContainer>
          </S.QuestionHeader>
          <Dialog.Body>
            <div className={styles.table}>
              {modulo &&
                modulo?.episodes?.map((episode, index) => {
                  return (
                    <div key={index} className={styles.videoCard}>
                      <p style={{ display: "flex", gap: 8 }}>
                        {" "}
                        <Video size={20} /> {episode?.name}
                      </p>
                      <div style={{ display: "flex", columnGap: 12 }}>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => setVideoQuestion(episode)}
                          title={"Gerenciar pesquisa"}
                        >
                          <ListMagnifyingGlass size={20} />
                        </div>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteVideo(episode?.videoId)}
                          title={"Excluir episódio"}
                        >
                          <TrashIcon size={20} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              <div
                className={styles.newVideoCard}
                style={{ justifyContent: "center" }}
                onClick={() => setShowNewVideo(true)}
              >
                <p>Novo episódio +</p>
              </div>
            </div>
          </Dialog.Body>
          <Divider />
        </Dialog.Content>
      </Dialog>
      {showNewVideo && (
        <UploadVideoDialog
          onClose={() => setShowNewVideo(false)}
          moduleId={moduleId}
          programId={courseId}
        />
      )}
      {videoQuestion && (
        <QuestionManagerDialog
          onClose={() => setVideoQuestion(undefined)}
          videoId={videoQuestion?.videoId || ""}
          episode={videoQuestion}
        />
      )}
    </>
  );
}
