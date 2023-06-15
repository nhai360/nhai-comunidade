import { DefaultLayout } from "@/layouts/app";
import { useVideoContext } from "@/contexts/VideoContext";
import { Button, Typography } from "@/ui";
import { Broadcast } from "@phosphor-icons/react";
import styles from "./styles.module.scss";
import { useLiveContext } from "@/contexts/LiveContext";
import { format } from "date-fns";
import { limitText } from "../utils";
import { useRouter } from "next/router";

export function AppLayout() {
  const router = useRouter();
  const { lives } = useLiveContext();

  return (
    <DefaultLayout>
      <DefaultLayout.Header />
      <DefaultLayout.Content style={{ padding: 0 }}>
        <div className={styles.contentContainer}>
          <div className={styles.headlineContent}>
            <div className={styles.headlineBox}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "1rem",
                }}
              >
                <Broadcast
                  size={32}
                  color="red"
                  style={{ marginBottom: "1rem" }}
                />
                <h2>Transmissões ao vivo.</h2>
                <h2>Você pode acessar ao lado.</h2>
              </div>
              <span>
                {" "}
                Transmita momentos especiais em tempo real para o mundo inteiro.
                Com nosso serviço de transmissões ao vivo, você pode
                compartilhar sua criatividade.
              </span>

              <div className={styles.buttonBox}>
                <Button
                  style={{
                    fontWeight: 500,
                    fontSize: 16,
                  }}
                >
                  Nova Transmissão{" "}
                </Button>
                <Button
                  style={{
                    border: "1px solid #dadada",
                    color: "#414141",
                    fontWeight: 400,
                    fontSize: 16,
                  }}
                  variant={"outline"}
                >
                  Voltar para plataforma
                </Button>
              </div>
              <div
                style={{
                  height: 1,
                  width: "100%",
                  marginTop: 36,
                  backgroundColor: "#dadada",
                }}
              ></div>
            </div>
          </div>
          <div className={styles.livesContent}>
            {lives?.map((live, index) => (
              <div
                key={index}
                className={styles.card}
                onClick={() => router.push(`/lives/${live.id}`)}
              >
                <img src={"/poster-flipped.jpg"} alt="" />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <h3>{limitText(live?.title, 12)}</h3>
                  <h4>
                    {format(
                      new Date(live?.startTime),
                      "dd 'de' MMMM yyyy 'às' HH:mm"
                    )}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DefaultLayout.Content>
    </DefaultLayout>
  );
}
