import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Video } from "@/client/videos";
import { Button, Dialog, Divider, Field, Success, Typography } from "@/ui";

import * as S from "./QuestionAnswersDialog.styles";
import { useCreatePlaylist } from "@/client/videos/useCreatePlaylist";
import { Question } from "@/client/questions";
import { useRouter } from "next/router";
import { useState } from "react";

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

  const {
    createPlaylist,
    isLoading: isCreatingPlaylist,
    isSuccess,
  } = useCreatePlaylist();

  const isLoading = isCreatingPlaylist;

  function handleSendAnwsers() {
    // createPlaylist(
    //   {
    //     title,
    //   },
    //   {
    //     onSuccess: (media) => {
    //     },
    //     onError: () => {
    //       toast.error("Não foi possível enviar suas respostas. Tente novamente!");
    //     },
    //   }
    // );
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
    if (!!findResponse) {
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
          {question?.options?.map((option, index) => {
            const res = answers.find((a) => a?.optionId === option?.id);
            return (
              <S.QuestionOptionContainer key={index}>
                <S.QuestionOptionTitle>{option?.title}</S.QuestionOptionTitle>
                <S.NumberPickerContainer>
                  {/* <S.NumberPickerLine /> */}
                  {[...Array(5)].map((_, index) => (
                    <S.NumberPickerOptionContainer
                      style={{
                        backgroundColor:
                          res?.response === `${index + 1}` ? "#EE0014" : "#000",
                      }}
                      key={index}
                      onClick={() =>
                        handleOption({
                          optionId: option?.id,
                          response: `${index + 1}`,
                        })
                      }
                    >
                      <S.NumberPickerOptionTitle>
                        {index + 1}
                      </S.NumberPickerOptionTitle>
                    </S.NumberPickerOptionContainer>
                  ))}
                </S.NumberPickerContainer>
              </S.QuestionOptionContainer>
            );
          })}
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
          <Typography.Text>
            Preencha todos os campos para concluir...
          </Typography.Text>
          <div style={{ display: "flex" }}>
            <Button
              type="button"
              variant={"text"}
              loading={isLoading}
              onClick={() => router.push("/negocios-de-orgulho")}
              style={{ borderRadius: 0, height: 48 }}
            >
              Voltar
            </Button>
            <Button
              style={{
                backgroundColor: "#EE0014",
                borderRadius: 0,
                height: 48,
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
