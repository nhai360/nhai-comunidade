import { Button, Dialog, Divider, Field, Success, Typography } from "@/ui";

import * as S from "./QuestionAnswersDialog.styles";
import { type QuizzesData } from "@/services/firebase/quiz";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "@/contexts";
import { useUser } from "@/client/users";
import { CreateResponsesQuiz, GetOneResponsesQuiz, type OptionsData } from "@/services/firebase/response-quiz";

interface Props {
  data: QuizzesData;
  onClose: () => void;
};

export function QuizAnswersDialog({ data, onClose }: Props) {
  const [answers, setAnswers] = useState<OptionsData[]>([])
  const [loading, setLoading] = useState(false)

  const { session } = useAuthContext();
  const { user } = useUser({
    id: session?.userId,
  });

  const handleSendAnwsers = async () => {
    if (!user?.id) return toast.error('Você precisa estar registrado para responder o questionário!');

    const userResponse = await GetOneResponsesQuiz(user.id)
    const isResponded = await userResponse.data.quiz.filter((quiz: any) => quiz.id === data.id)

    if (isResponded.length) {
      onClose();
      return toast.error('Você já respondeu esse questionário!');
    }

    if (answers.length < data?.data.options.length) {
      return toast.error('Preencha todos os campos para concluir!');
    }

    await CreateResponsesQuiz(
      user.id,
      {
        user_fullname: user.fullName,
        user_email: user.email,
        user_phone: user.phone,
        user_birthdate: user.birthDate,
      },
      {
        id: data.id,
        options: answers
      },
      setLoading,
      () => onClose()
    )
  }

  // if (isSuccess) {
  //   return (
  //     <Dialog open>
  //       <Dialog.Content>
  //         <Dialog.Header closable={true} />
  //         <Dialog.Body>
  //           <Success
  //             title="Recebemos suas respostas!"
  //             description="Agora pode continuar a assistir os episódios."
  //             onClose={onClose}
  //           />
  //         </Dialog.Body>
  //       </Dialog.Content>
  //     </Dialog>
  //   );
  // }

  const handleOption = (data: OptionsData) => {
    const findResponse = answers.find((a) => a?.option === data?.option);
    if (findResponse) {
      setAnswers(
        answers.map((a) => (a?.option === data?.option ? data : a))
      );
    } else {
      setAnswers([...answers, data]);
    }
  };

  return (
    <Dialog open>
      <Dialog.Content style={{ borderRadius: 0, border: "none" }}>
        <S.QuestionHeader>
          {/* <S.QuestionHeaderImage src={video?.thumbnail?.url as any} /> */}
          <S.QuestionHeaderTitleContainer>
            <S.QuestionHeaderTitle>PREENCHA O QUESTIONÁRIO</S.QuestionHeaderTitle>
            <S.QuestionHeaderSubtitle>
              Sendo 1 (pouco) e 5 (muito), quão preparado(a) você se sente para administrar o seu negócio em relação à:
            </S.QuestionHeaderSubtitle>
          </S.QuestionHeaderTitleContainer>
        </S.QuestionHeader>
        <Dialog.Body>
          <div
            style={{ rowGap: "2rem", display: "flex", flexDirection: "column" }}
          >
            {data?.data.options.map((option, index) => {
              const res = answers.find((a) => a?.option === option);
              return (
                <S.QuestionOptionContainer key={index}>
                  <S.QuestionOptionTitle>{option}</S.QuestionOptionTitle>
                  <S.NumberPickerContainer>
                    <S.NumberPickerLine />
                    {[...Array(5)].map((_, index) => (
                      <S.NumberPickerOptionContainer
                        key={index}
                        style={{
                          backgroundColor:
                            res?.response === (index + 1)
                              ? "#EE0014"
                              : "#fff",
                        }}
                        onClick={() =>
                          handleOption({
                            option: option,
                            response: (index + 1),
                          })
                        }
                      >
                        <S.NumberPickerOptionTitle
                          style={{
                            color:
                              res?.response === (index + 1)
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
              disabled={loading}
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
            <Button
              style={{
                backgroundColor: "#EE0014",
                borderRadius: 0,
                height: 48,
                fontFamily: "RingBold",
              }}
              type="submit"
              loading={loading}
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
