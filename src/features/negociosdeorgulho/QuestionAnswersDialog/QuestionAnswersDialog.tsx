import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Video } from "@/client/videos";
import { Button, Dialog, Divider, Field, Success, Typography } from "@/ui";

import * as S from "./QuestionAnswersDialog.styles";
import { useCreatePlaylist } from "@/client/videos/useCreatePlaylist";
import { Question } from "@/client/questions";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCreateAnswers } from "@/client/questions/useCreateAnswers";

type Props = {
  onClose: () => void;
  question: Question;
  video: Video;
};

interface IAnswerOption {
  optionId: string;
  response: string;
}

export function QuestionAnswersDialog({ onClose, question, video }: Props) {
  const router = useRouter();

  const [answers, setAnswers] = useState<IAnswerOption[]>([]);

  const { createAnswers, isLoading, isSuccess } = useCreateAnswers();

  function handleSendAnwsers() {
    if (answers?.length === question?.options?.length) {
      createAnswers(
        {
          questionId: question?.id,
          answers,
        },
        {
          onSuccess: (media) => {},
          onError: () => {
            toast.error(
              "Não foi possível enviar suas respostas. Tente novamente!"
            );
          },
        }
      );
    } else {
      toast.error("Preencha todas as opções");
    }
  }

  if (isSuccess) {
    return (
      <Dialog open>
        <Dialog.Content>
          <Dialog.Header closable={true} />
          <Dialog.Body>
            <Success
              title="Recebemos suas respostas!"
              description="Agora pode continuar a assistir os episódios."
              onClose={onClose}
            />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog>
    );
  }

  const handleOption = (answer: IAnswerOption) => {
    const findResponse = answers.find((a) => a?.optionId === answer?.optionId);
    if (findResponse) {
      setAnswers(
        answers.map((a) => (a?.optionId === answer?.optionId ? answer : a))
      );
    } else {
      setAnswers([...answers, answer]);
    }
  };

  return (
    <Dialog open>
      <Dialog.Content style={{ borderRadius: 0, border: "none" }}>
        <S.QuestionHeader>
          <S.QuestionHeaderImage src={video?.thumbnail?.url as any} />
          <S.QuestionHeaderTitleContainer>
            <S.QuestionHeaderTitle>{question?.title}</S.QuestionHeaderTitle>
            <S.QuestionHeaderSubtitle>
              {question?.description}
            </S.QuestionHeaderSubtitle>
          </S.QuestionHeaderTitleContainer>
        </S.QuestionHeader>
        <Dialog.Body>
          <div
            style={{ rowGap: "2rem", display: "flex", flexDirection: "column" }}
          >
            {question?.options?.map((option, index) => {
              const res = answers.find((a) => a?.optionId === option?.id);
              return (
                <S.QuestionOptionContainer key={index}>
                  <S.QuestionOptionTitle>{option?.title}</S.QuestionOptionTitle>
                  <S.NumberPickerContainer>
                    <S.NumberPickerLine />
                    {[...Array(5)].map((_, index) => (
                      <S.NumberPickerOptionContainer
                        style={{
                          backgroundColor:
                            res?.response === `${index + 1}`
                              ? "#EE0014"
                              : "#fff",
                        }}
                        key={index}
                        onClick={() =>
                          handleOption({
                            optionId: option?.id,
                            response: `${index + 1}`,
                          })
                        }
                      >
                        <S.NumberPickerOptionTitle
                          style={{
                            color:
                              res?.response === `${index + 1}`
                                ? "#fff"
                                : "#EE0014",
                          }}
                        >
                          {index + 1}
                        </S.NumberPickerOptionTitle>
                      </S.NumberPickerOptionContainer>
                    ))}
                  </S.NumberPickerContainer>
                </S.QuestionOptionContainer>
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
            Preencha todos os campos para concluir...
          </Typography.Text>
          <div style={{ display: "flex", columnGap: 8 }}>
            <Button
              type="button"
              variant={"outline"}
              disabled={isLoading}
              onClick={() => router.push("/negocios-de-orgulho")}
              style={{
                borderRadius: 0,
                height: 48,
                fontFamily: "RingBold",
                borderColor: "#c9c9c9",
              }}
            >
              Voltar
            </Button>
            <Button
              style={{
                backgroundColor: "#EE0014",
                borderRadius: 0,
                height: 48,
                fontFamily: "RingBold",
              }}
              type="submit"
              loading={isLoading}
              onClick={handleSendAnwsers}
            >
              Enviar
            </Button>
          </div>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
