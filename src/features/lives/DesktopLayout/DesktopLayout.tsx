import { DefaultLayout } from "@/layouts/desktop";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { LiveCard } from "../LiveCard";
import { Button } from "@/ui";
import { Broadcast } from "@phosphor-icons/react";
import { format } from "date-fns";
import { limitText } from "../utils";
import { useUserLiveContext } from "@/contexts/UserLiveContext";

interface Types {
  handleCreate: () => void;
}

export function DesktopLayout({ handleCreate }: Types) {
  const router = useRouter();
  const { userlives } = useUserLiveContext();

  return (
    <DefaultLayout hasSider={false}>
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
              Transmita momentos especiais em tempo real para a plataforma
              Contaí. Com o serviço de transmissões ao vivo, você pode
              compartilhar sua criatividade.
            </span>

            <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
              <Button
                onClick={handleCreate}
                style={{
                  borderRadius: 8,
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                Nova Transmissão
              </Button>
              <Button
                onClick={() => router.push("/")}
                style={{
                  borderRadius: 8,
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
          <div className={styles.scrollViewContainer}>
            {userlives
              ?.filter((a) => a?.spaceId)
              ?.map((live, index) => (
                <div
                  key={index}
                  className={styles.card}
                  onClick={() => router.push(`/lives/${live.id}`)}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                  >
                    <img src={"/poster-flipped.jpg"} alt="" />

                    <h3>{limitText(live?.title, 24)}</h3>
                  </div>

                  <h4>{format(new Date(), "dd 'de' MMMM yyyy 'às' HH:mm")}</h4>
                </div>
              ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
