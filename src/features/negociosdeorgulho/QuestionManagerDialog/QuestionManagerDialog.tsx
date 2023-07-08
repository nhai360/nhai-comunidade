import styles from "./styles.module.scss";

import { Button, Dialog, Divider, Typography } from "@/ui";

import * as S from "./QuestionManagerDialog.styles";
import { useQuestion } from "@/client/questions";
import { useCreateQuestion } from "@/client/questions/useCreateQuestion";
import { toast } from "react-toastify";
import { useDeleteQuestion } from "@/client/questions/useDeleteQuestion";
import { useState } from "react";
import { ICourseEpisode } from "@/@types/cousers";
import { TrashIcon } from "@/ui/_icons";

type Props = {
  onClose: () => void;
  videoId: string;
  episode: ICourseEpisode;
};

export function QuestionManagerDialog({ onClose, videoId, episode }: Props) {
  const { question } = useQuestion({ videoId });
  const [type, setType] = useState<"START" | "END">("START");
  const [options, setOptions] = useState([
    { title: "", description: "", type: "NUMBER" },
  ]);

  const { createQuestion, isLoading, isError } = useCreateQuestion();
  const {
    deleteQuestion,
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
  } = useDeleteQuestion();

  const handleAddOption = () => {
    const validOptions = options?.filter((o) => o?.title);
    options?.length < 5 &&
      setOptions([
        ...validOptions,
        {
          title: "",
          description: "",
          type: "NUMBER",
        },
      ]);
  };

  const handleEditOption = (index: number, title: string) => {
    const edited = options?.map((o, i) => {
      return i === index ? { ...o, title } : o;
    });
    setOptions(edited);
  };

  const handleRemoveOption = (index: number) => {
    const filtered = options?.filter((_, i) => i !== index);
    setOptions(filtered);
  };

  const handleCreateQuestion = () => {
    const validOptions = options?.filter((o) => o?.title);
    if (validOptions?.length <= 0) {
      toast.error("Insira pelo menos uma pergunta!");
      return;
    }
    if (videoId && !question && type) {
      const newQuestion = {
        title:
          type === "START"
            ? "PARA COMEÇAR, PREENCHA..."
            : "PARA CONCLUIR, PREENCHA...",
        description:
          "Sendo 1 (pouco) e 5 (muito), quão preparado(a) você se sente para administrar o seu negócio em relação à:",
        type,
        options: validOptions,
      };
      createQuestion(
        {
          videoId,
          question: newQuestion as any,
        },
        {
          onSuccess: (question) => {
            toast.success("Pesquisa criada com sucesso!");
          },
          onError: () => {
            toast.error("Não foi possível criar a pesquisa. Tente novamente!");
          },
        }
      );
    }
  };

  const handleDeleteQuestion = () => {
    if (videoId && !!question) {
      deleteQuestion(
        {
          videoId,
        },
        {
          onSuccess: () => {
            onClose();
            toast.success("Pesquisa apagada com sucesso!");
          },
          onError: () => {
            toast.error(
              "Não foi possível deletar a pesquisa. Tente novamente!"
            );
          },
        }
      );
    }
  };

  const cantDelete = !!question && question?.answers?.length > 0;

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <Dialog.Content style={{ borderRadius: 0, border: "none" }}>
          <S.QuestionHeader>
            <S.QuestionHeaderTitleContainer>
              <S.QuestionHeaderTitle>
                {question?.title ||
                  "Pesquisa | Este episódio não possui nenhuma pesquisa"}
              </S.QuestionHeaderTitle>
              {!!question && (
                <S.QuestionHeaderSubtitle>
                  {question?.description}
                </S.QuestionHeaderSubtitle>
              )}
              <S.QuestionHeaderSubtitle>
                {`Episódio "${episode?.name}"`}
              </S.QuestionHeaderSubtitle>
            </S.QuestionHeaderTitleContainer>
          </S.QuestionHeader>
          <Dialog.Body>
            <div
              style={{
                rowGap: "0.5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {question &&
                question?.options?.map((option, index) => {
                  return (
                    <fieldset className={styles.optionContainer} key={index}>
                      <legend>
                        {option?.type === "TEXT"
                          ? "O usuário escreverá sua resposta"
                          : "Opção de 1 a 5"}
                      </legend>
                      <S.QuestionOptionTitle>
                        {option?.title}
                      </S.QuestionOptionTitle>
                    </fieldset>
                  );
                })}
              {!question && (
                <div>
                  <S.QuestionOptionContainer>
                    <S.QuestionOptionTitle>
                      Esta pesquisa aparecerá
                    </S.QuestionOptionTitle>
                    <div className={styles.questionTypeContainer}>
                      <div className={styles.typeContainer}>
                        <input
                          id="type-start"
                          type="radio"
                          value={"START"}
                          checked={type === "START"}
                          onChange={(e) => setType("START")}
                        />
                        <label htmlFor="type-start">
                          Antes do episódio começar
                        </label>
                      </div>
                      <div className={styles.typeContainer}>
                        <input
                          id="type-start"
                          type="radio"
                          value={"END"}
                          checked={type === "END"}
                          onChange={(e) => setType("END")}
                        />
                        <label htmlFor="type-start">
                          Depois do episódio terminar
                        </label>
                      </div>
                    </div>
                    <S.QuestionOptionTitle>
                      Perguntas da pesquisa:
                    </S.QuestionOptionTitle>
                    {options?.map((option, index) => {
                      return (
                        <fieldset
                          className={styles.optionContainer}
                          key={index}
                        >
                          <legend>
                            {option?.type === "TEXT"
                              ? "O usuário escreverá sua resposta"
                              : "Opção de 1 a 5"}
                          </legend>
                          <input
                            type="text"
                            value={option?.title}
                            onChange={(e) =>
                              handleEditOption(index, e?.target?.value)
                            }
                          />
                          <div onClick={() => handleRemoveOption(index)}>
                            <TrashIcon size={20} />
                          </div>
                        </fieldset>
                      );
                    })}
                    <div
                      className={styles.addOptionButton}
                      onClick={handleAddOption}
                    >
                      <p>
                        {options?.length < 5
                          ? "Adicionar pergunta +"
                          : "Limite de perguntas atingido"}
                      </p>
                    </div>
                  </S.QuestionOptionContainer>
                </div>
              )}
            </div>
          </Dialog.Body>
          <Divider />
          <Dialog.Footer
            css={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "$4",
            }}
          >
            <Typography.Text style={{ fontFamily: "RingMedium" }}>
              {!question && "Preencha todos os campos para concluir..."}
              {cantDelete &&
                "Não é possível excluir a pesquisa pois alguns usuários já responderam"}
            </Typography.Text>
            <div style={{ display: "flex", columnGap: 8 }}>
              <Button
                type="button"
                variant={"outline"}
                disabled={isLoading || isLoadingDelete}
                onClick={onClose}
                style={{
                  borderRadius: 0,
                  height: 48,
                  fontFamily: "RingBold",
                  borderColor: "#c9c9c9",
                }}
              >
                Voltar
              </Button>
              {question ? (
                <Button
                  style={{
                    backgroundColor: "#EE0014",
                    borderRadius: 0,
                    height: 48,
                    fontFamily: "RingBold",
                  }}
                  type="submit"
                  loading={isLoadingDelete}
                  onClick={handleDeleteQuestion}
                  disabled={cantDelete}
                >
                  Excluir pesquisa
                </Button>
              ) : (
                <Button
                  style={{
                    backgroundColor: "#EE0014",
                    borderRadius: 0,
                    height: 48,
                    fontFamily: "RingBold",
                  }}
                  type="submit"
                  loading={isLoading}
                  onClick={handleCreateQuestion}
                >
                  Criar pesquisa
                </Button>
              )}
            </div>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
