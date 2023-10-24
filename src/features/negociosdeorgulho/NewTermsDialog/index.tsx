import { CreateUserInformations } from "@/services/firebase/user-informations";
import { Button, Dialog, Divider } from "@/ui";
import { IPInfoContext } from "ip-info-react";
import { useContext, useState } from "react";
import { useAuthContext } from "@/contexts";
import { useUser } from "@/client/users";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";
import moment from "moment";

type Props = {
  onClose: () => void;
  onCloseCancel: () => void;
};

export function NewTermsDialog({ onClose, onCloseCancel }: Props) {
  const userInfo = useContext(IPInfoContext);

  const [loading, setLoading] = useState(false);
  const [isDisableButtons, setDisableButtons] = useState(false);

  const { session } = useAuthContext();
  const { user } = useUser({
    id: session?.userId,
  });

  const getIPAddress = () => {
    if (typeof window === "undefined") return

    const sUsrAg = navigator.userAgent;
    let sBrowser = "";

    if (sUsrAg.indexOf("Chrome") > -1) {
      sBrowser = "Google Chrome";
    } else if (sUsrAg.indexOf("Safari") > -1) {
      sBrowser = "Apple Safari";
    } else if (sUsrAg.indexOf("Opera") > -1) {
      sBrowser = "Opera";
    } else if (sUsrAg.indexOf("Firefox") > -1) {
      sBrowser = "Mozilla Firefox";
    } else if (sUsrAg.indexOf("MSIE") > -1) {
      sBrowser = "Microsoft Internet Explorer";
    }

    return {
      browser: sBrowser ?? 'unknown',
      ip: userInfo.ip,
      date: `${moment(new Date())}`
    }
  }

  const defineTermsUser = async () => {
    if (!user?.id) return

    const ipInfo = getIPAddress()

    await CreateUserInformations(
      user.id,
      {
        browser: ipInfo?.browser ?? 'unknown',
        date: ipInfo?.date ?? `${moment(new Date())}`,
        ip: ipInfo?.ip ?? 'invalid',
        session: 'unknown'
      },
      setLoading,
      onClose
    )
  }

  return (
    <>
      <Dialog open onOpenChange={onCloseCancel}>
        <Dialog.Content style={{ borderRadius: 24, border: "none" }}>
          <Dialog.Header title={"Termos e condições de uso"} closable />
          <Dialog.Body>
            <p className={styles.paragraph}>
              Autorizo a Heineken do Brasil a armazenar e utilizar minhas informações
              para analisar meus comportamentos e interesses, melhorando a experiência
              com suas marcas para oferecer comunicações personalizadas.
              Eu posso cancelar minha inscrição a qualquer momento.
            </p>
            <p className={styles.paragraph}>
              Autorizo a Heineken do Brasil a me enviar notícias, promoções e ofertas
              sobre suas marcas e eventos, baseados nas minhas preferências e comportamentos,
              através de mídia online, e-mail ou telefone. Eu posso cancelar minha
              inscrição a qualquer momento.
            </p>
            <p className={styles.paragraph}>
              Veja mais informações nos <a href="https://www.amstelbrasil.com/informacoes-legais/termos-de-uso" target="_blank" rel="noreferrer">Termos de Uso</a> e <a href="https://www.amstelbrasil.com/informacoes-legais/politica-de-privacidade" target="_blank" rel="noreferrer">Política de Privacidade</a>.
            </p>
          </Dialog.Body>
          <Divider />
          <Dialog.Footer
            css={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingTop: "$6",
              gap: "$4",
            }}
          >
            <button
              type="submit"
              onClick={() => {
                setDisableButtons(true)
                onCloseCancel()
              }}
              className={styles.buttonClose}
              disabled={isDisableButtons}
            >
              Recusar
            </button>
            <Button
              type="button"
              loading={loading}
              disabled={isDisableButtons}
              onClick={async () => await defineTermsUser()}
            >
              Aceitar termos
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
