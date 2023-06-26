import { ReactNode, useEffect, useState } from "react";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

import * as S from "./DefaultLayout.styles";
import styles from "./defaultLayout.module.scss";
import { Button } from "@/ui";
import { Check, PencilSimpleLine } from "@phosphor-icons/react";
import { SubscribeSummit, handleGetSubscribe } from "@/services/googlesheets";
import { toast } from "react-toastify";
import { useAuthContext } from "@/contexts";
import { useUser } from "@/client/users";

type Props = {
  children: ReactNode;
  hasSider?: boolean;
};

export function DefaultLayout({ children, hasSider = true }: Props) {
  const [loading, setLoading] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(true);

  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const handleSubscribe = async () => {
    setLoading(true);
    !!user &&
      !isSubscribe &&
      (await SubscribeSummit(user?.id, {
        email: user?.email,
        etnia: user?.ethnicity,
        genero: user?.gender,
        nascimento: user?.birthDate,
        nome: user?.fullName,
        orientacao: user?.sexualOrientation,
        telefone: user?.phone,
        nickname: user?.nickname,
      })
        .then(() => {
          handleGetSubscribe(user?.id).then((res) => setIsSubscribe(true));
          toast.success("Inscrição realizada com sucesso!");
        })
        .catch(() => {
          toast.error("Não foi possível se inscrever :(");
        }));
    setLoading(false);
  };

  useEffect(() => {
    user && handleGetSubscribe(user?.id).then((res) => setIsSubscribe(!!res));
  }, [user]);

  return (
    <S.Wrapper>
      {!isSubscribe && (
        <div className={styles.containerHightlight}>
          <h4>
            • 6 Edição do Contaí! Encontro que geram negócios!{" "}
            <span>| 70% das vagas preenchidas, esperamos por vocês!</span>{" "}
          </h4>
          <div style={{ display: "flex", alignItems: "center" }}>
            {!isSubscribe && <p>Ainda não se inscreveu?</p>}
            <Button
              variant={"primary"}
              style={{
                height: 48,
                borderRadius: 8,
                backgroundColor: isSubscribe ? "#c82560" : "#01a1ff",
              }}
              loading={loading}
              onClick={handleSubscribe}
              disabled={isSubscribe}
            >
              {isSubscribe ? (
                <>
                  Inscrito <Check size={24} />
                </>
              ) : (
                <>
                  Inscrever <PencilSimpleLine size={24} />
                </>
              )}
            </Button>
          </div>
        </div>
      )}
      <Header user={user as any} />
      {hasSider && <Sidebar />}
      {children}
    </S.Wrapper>
  );
}

DefaultLayout.Content = S.Content;
DefaultLayout.Sider = S.Sider;
DefaultLayout.SimpleGrid = S.SimpleGrid;
DefaultLayout.GridWithSider = S.GridWithSider;
