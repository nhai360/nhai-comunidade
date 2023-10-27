/* eslint-disable no-void */
import { useEffect, useState } from "react";
import { DefaultLayout } from "@/layouts/app";
import { QuizAnswersDialog } from "../QuizAnswersDialog";
import { useAuthContext } from "@/contexts";
import { useUser } from "@/client/users";
import { GetUserProgress, type IWatchedVideo } from "@/services/firebase/progress";
import { useRouter } from "next/router";
import { GetQuizzes, QuizzesData } from "@/services/firebase/quiz";
import { GetOneResponsesQuiz } from "@/services/firebase/response-quiz";
import { NewTermsDialog } from "../NewTermsDialog";
import { GetOneUserInfo } from "@/services/firebase/user-informations";
import { toast } from "react-toastify";

import IPInfo from 'ip-info-react';

type Props = {
  hasSider?: boolean;
};

export function AppLayout({ hasSider }: Props) {
  const totalVideo = 20
  const router = useRouter()

  const [quizData, setDataQuiz] = useState<QuizzesData>()
  const [showQuizAnswers, setShowQuizAnswers] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [watchedVideos, setWatchedVideos] = useState<IWatchedVideo[]>([]);
  const [compareWatchedVideos, setComapreWatchedVideos] = useState<IWatchedVideo[]>([]);

  const { session } = useAuthContext();
  const { user } = useUser({
    id: session?.userId,
  });

  const validateTermsUser = async () => {
    if (!user?.id) {
      setShowTerms(false)
      return
    }

    const data: any = await GetOneUserInfo(user.id)

    !data.data
      ? setShowTerms(true)
      : setShowTerms(false)
  }

  const getProgressUser = async () => {
    if (!user?.id) return

    setTimeout(async () => {
      if (!showTerms) {
        await GetUserProgress(user?.id, setComapreWatchedVideos)

        if (!watchedVideos.length || compareWatchedVideos.length > watchedVideos.length) {
          await GetUserProgress(user?.id, setWatchedVideos)
          showQuizzes()
        }
    
        showQuizzes()
      }
    }, 3000)
  }

  const showQuizzes = async () => {
    if (!user?.id) return

    const userResponse = await GetOneResponsesQuiz(user.id)
    const quizzes = await GetQuizzes()
    const userProgress = watchedVideos.length * 100 / totalVideo
    
    const quiz = quizzes.filter(q => parseInt(`${q.data.show_percentage}`) >= userProgress)

    const closest = quiz.length > 0 && quiz.reduce((prev, curr) =>  {
      return Math.abs(curr.data.show_percentage - userProgress) < Math.abs(prev.data.show_percentage - userProgress)
        ? curr
        : prev;
    });

    if (!closest) return

    const isResponded = await userResponse.data.quiz.filter((quiz: any) => quiz.id === closest.id)

    if (isResponded.length) return
    if (!quizzes.length) return

    if (userProgress >= parseInt(`${closest.data.show_percentage}`) && userProgress <= (parseInt(`${closest.data.show_percentage}`) + 10)) {
      setDataQuiz(closest)
      setShowQuizAnswers(true)
    } else {
      setDataQuiz(undefined)
      setShowQuizAnswers(false)
    }

    setDataQuiz(closest)
  }

  useEffect(() => {
    void validateTermsUser().then(async () => {
      if (!showTerms) {
        await getProgressUser()
      }
    })

  }, [watchedVideos, router.asPath, user?.id, showTerms])

  return (
    <DefaultLayout>
      <DefaultLayout.Header loginAmstel />
      {!showTerms && showQuizAnswers && quizData && (
        <QuizAnswersDialog
          data={quizData}
          onClose={() => {
            setDataQuiz(undefined)
            setShowQuizAnswers(false)
          }}
        />
      )}
      {showTerms &&
        <IPInfo>
          <NewTermsDialog
            onCloseCancel={async () => {
              toast.warn('Não é possível prosseguir sem aceitar os termos.', { autoClose: 650 })
              toast('Redirecionando...', { autoClose: 800, hideProgressBar: true })
              await router.push('/')
            }}
            onClose={() => setShowTerms(false)}
          />
        </IPInfo>
      }
    </DefaultLayout>
  );
}
