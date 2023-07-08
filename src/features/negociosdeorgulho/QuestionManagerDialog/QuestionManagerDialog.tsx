import styles from "./styles.module.scss";

import { Button, Dialog, Divider, Typography } from "@/ui";

import * as S from "./QuestionManagerDialog.styles";
import { useQuestion } from "@/client/questions";
import { useCreateQuestion } from "@/client/questions/useCreateQuestion";
import { toast } from "react-toastify";
import { useDeleteQuestion } from "@/client/questions/useDeleteQuestion";
import { useState } from "react";

type Props = {
  onClose: () => void;
  videoId: string;
};

export function QuestionManagerDialog({ onClose, videoId }: Props) {
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

  const handleAddOption = (title: string) => {
    setOptions([
      ...options,
      {
        title,
        description: "",
        type: "NUMBER",
      },
    ]);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options?.filter((_, i) => i !== index));
  };

  const handleCreateQuestion = () => {
    if (videoId && !question && type && options?.length > 0) {
      const newQuestion = {
        title:
          type === "START"
            ? "PARA COMEÇAR, PREENCHA..."
            : "PARA CONCLUIR, PREENCHA...",
        description:
          "Sendo 1 (pouco) e 5 (muito), quão preparado(a) você se sente para administrar o seu negócio em relação à:",
        type,
        options,
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
          onSuccess: (question) => {
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

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <Dialog.Content style={{ borderRadius: 0, border: "none" }}>
          <S.QuestionHeader>
            <S.QuestionHeaderTitleContainer>
              <S.QuestionHeaderTitle>
                {question?.title || "Pesquisa"}
              </S.QuestionHeaderTitle>
              <S.QuestionHeaderSubtitle>
                {!!question
                  ? question?.description
                  : "Este episódio não possui nenhuma pesquisa"}
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
              {question?.options?.map((option, index) => {
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
              {!!question
                ? "*Excluindo a pesquisa você perderá as respostas dos usuários"
                : "Preencha todos os campos para concluir..."}
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
              {!!question ? (
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
