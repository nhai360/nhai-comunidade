import { User } from "@/client/users";
import { getToken } from "@/lib/auth";
import { handleDeleteChatComment } from "@/services/firebase/chat";
import { Button, Dialog, Divider } from "@/ui";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  onClose: () => void;
  liveId: string;
  comment: string;
  user: User;
};

const DeleteChatDialog = ({ onClose, comment, liveId, user }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    user &&
      handleDeleteChatComment(liveId, comment, user)
        .then(() => {
          toast.success("Comentário deletado");
          setIsLoading(false);
          onClose();
        })
        .catch(() => {
          toast.error("Não foi possível deletar o comentário :(");
          setIsLoading(false);
        });
  };

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <Dialog.Content>
          <Dialog.Header title={"Tem certeza que deseja excluir?"} closable />
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
            <Button
              type="submit"
              loading={isLoading}
              variant={"transparent"}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              onClick={() => handleSubmit()}
            >
              Confirmar
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
      );
    </>
  );
};

export default DeleteChatDialog;
