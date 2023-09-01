import { Button, Dialog, Divider, Typography } from "@/ui";
import React, { useState } from "react";

type Props = {
  onClose: () => void;
};

const TermsDialog = ({ onClose }: Props) => {
  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <Dialog.Content>
          <Dialog.Header title={"Termos e condições de uso"} closable />
          <Dialog.Body>
            <Typography.Text>
              Autorizo a Heineken do Brasil a armazenar e utilizar minhas
              informações para analisar meus comportamentos e interesses,
              melhorando a experiência com suas marcas para oferecer
              comunicações personalizadas. Eu posso cancelar minha inscrição a
              qualquer momento.
            </Typography.Text>
            <br />
            <br />
            <Typography.Text>
              Autorizo a Heineken do Brasil a me enviar notícias, promoções e
              ofertas sobre suas marcas e eventos, baseados nas minhas
              preferências e comportamentos, através de mídia online, e-mail ou
              telefone. Eu posso cancelar minha inscrição a qualquer momento.
            </Typography.Text>
            <br />
            <br />
            <Typography.Text>
              Veja mais informações nos{" "}
              <a
                href="https://www.amstelbrasil.com/informacoes-legais/termos-de-uso/"
                target="_blank"
              >
                Termos de Uso
              </a>{" "}
              e{" "}
              <a
                href="https://www.amstelbrasil.com/informacoes-legais/politica-de-privacidade/"
                target="_blank"
              >
                Política de Privacidade
              </a>
              .
            </Typography.Text>
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
            <Button type="submit" onClick={() => onClose()}>
              Fechar
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

export default TermsDialog;
