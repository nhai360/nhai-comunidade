import { IconPlus, IconTrash } from "@/ui/_icons/icons";
import { Dialog, Loading } from "@/ui";
import { useState } from "react";

import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { CreateQuiz, GetQuizzes } from "@/services/firebase/quiz";

type Props = {
  onClose: () => void;
};

export function QuizCreateDialog({ onClose }: Props) {
  const [percentage, setPercentage] = useState(0)
  const [options, setOptions] = useState([""])
  const [title, setTitle] = useState("")

  const [loading, setLoading] = useState(false)

  const handleAddOption = () => {
    if (options.length >= 5) {
      return toast.error('Limite de opções excedido!')
    }

    setOptions(prev => [...prev, ""])
  }

  const handleRemoveOption = (index: number) => {
    if (options.length === 1) {
      return onClose()
    }

    const removeItem = options.filter((_, i) => i !== index)

    setOptions(removeItem)
  }

  const handleCreateQuiz = async () => {
    const quizzes = await GetQuizzes()

    const validationOptions = options.filter(option => !option)
    const validationQuizzesTitle = quizzes.filter(quiz => quiz.data.title === title)
    const validationQuizzesPercentage = quizzes.filter(quiz => quiz.data.show_percentage === percentage)

    if (!title) return toast.error('O questionário deve ter um título!')
    if (validationQuizzesTitle.length) return toast.error('Já existe um questionário com esse título!')
    if (validationQuizzesPercentage.length) return toast.error('Já existe um questionário com essa porcentagem do processo!')

    if (validationOptions.length) {
      return toast.error('Todas opções deve ter uma pergunta!')
    }

    await CreateQuiz({ title, options, show_percentage: percentage }, setLoading)
      .then(() => onClose())
  }

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <Dialog.Content style={{ borderRadius: 0, border: "none" }}>
          <Dialog.Header isAmstel title={"Novo questionário"} closable />
          <header className={styles.header}>
            <h3>Defina as configurações para seu questionário</h3>
            <div>
              <span>Título do questionário</span>
              <input
                type="text"
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
            </div>
          </header>

          <Dialog.Body>
            <div className={styles.session}>
              <h3 className={styles.title}>Esse questionário aparecera em qual porcentagem do processo:</h3>

              <div className={styles.inputRange}>
                <input
                  type="range"
                  step={5}
                  min={0}
                  max={100}
                  value={percentage}
                  onChange={(event: any) => setPercentage(event.target.value)}
                />
                <span>{percentage}%</span>
              </div>
            </div>
            <div className={styles.session}>
              <h3 className={styles.title}>Perguntas da pesquisa:</h3>
              <ul className={styles.listOptionsWrapper}>
                {options.map((_, index) => (
                  <li key={index}>
                    <span>Opção de {index + 1} a 5</span>
                    <div>
                      <input
                        type="text"
                        autoFocus
                        onChange={event => {
                          const array = options.map((option, i) => {
                            if (i === index) {
                              return event.target.value
                            } else {
                              return option
                            }
                          })

                          setOptions(array)
                        }}
                      />
                      <button type="button" onClick={() => handleRemoveOption(index)}>
                        <IconTrash size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              {options.length < 5 &&
                <div className={styles.addOptionsWrapper}>
                  <button type="button" onClick={handleAddOption}>
                    Adicionar opção
                    <IconPlus size={16} strokeWidth={0} />
                  </button>
                </div>
              }
            </div>
          </Dialog.Body>
          <div className={styles.sendBttonsWrapper}>
            <button type="button" onClick={handleCreateQuiz} disabled={loading}>
              Criar questionário
              {loading && <Loading />}
            </button>
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
