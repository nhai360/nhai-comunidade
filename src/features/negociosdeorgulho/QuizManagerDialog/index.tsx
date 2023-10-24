import { DeleteQuiz, GetQuizzes, type QuizzesData } from "@/services/firebase/quiz";
import { IconPlus, IconTrash } from "@/ui/_icons/icons";
import { Dialog, Loading } from "@/ui";

import styles from "./styles.module.scss";
import { QuizCreateDialog } from "../QuizCreateDialog";
import { useEffect, useState } from "react";
import { QuizEditDialog } from "../QuizEditDialog";

type Props = {
  onClose: () => void;
};

export function QuizManagerDialog({ onClose }: Props) {
  const [showCreateQuiz, setShowCreateQuiz] = useState(false)
  const [showEditQuizId, setShowEditQuizId] = useState('')
  const [quizzes, setQuizzes] = useState<QuizzesData[]>()

  const [loading, setLoading] = useState(false)

  const getQuizzes = async () => {
    const data = await GetQuizzes()

    setQuizzes(data)
  }

  // eslint-disable-next-line no-void
  useEffect(() => void getQuizzes(), [showCreateQuiz, loading, showEditQuizId])

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <Dialog.Content style={{ borderRadius: 0, border: "none" }}>
          <Dialog.Header isAmstel title={"Gerenciamento de questionários"} closable />

          <Dialog.Body>
            <ul className={styles.listFormsWrapper}>
              {quizzes?.map(quiz =>
                <li key={quiz.id}>
                  <button type="button" onClick={() => setShowEditQuizId(quiz.id)}>  
                    <span title="O questionário exibirá quando o usuário atingir essa porcentagem de evolução.">
                      {quiz.data.show_percentage}%
                    </span>
                    {quiz.data.title}
                  </button>
                  <button
                    type="button"
                    className={styles.buttonDelete}
                    onClick={() => DeleteQuiz(quiz.id, setLoading)}
                    disabled={loading}
                  >
                    {!loading
                      ? <IconTrash size={20} strokeWidth={2} />
                      : <Loading />
                    }
                  </button>
                </li>
              )}
              <li className={styles.addQuiz}>
                <button type="button" onClick={() => setShowCreateQuiz(true)}>
                  Novo questionário
                  <IconPlus size={16} strokeWidth={0} />
                </button>
              </li>
            </ul>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog>
      {showCreateQuiz && (
        <QuizCreateDialog onClose={() => setShowCreateQuiz(false)} />
      )}
      {!!showEditQuizId && (
        <QuizEditDialog
          id={showEditQuizId}
          onClose={() => setShowEditQuizId('')}
        />
      )}
    </>
  );
}
