import { getToken } from "@/lib/auth";
import { Button, Dialog, Divider } from "@/ui";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {
  onClose: () => void;
  articleId: string;
};

const DeleteArticleDialog = ({ onClose, articleId }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/articles/${articleId}`;

      const response = await axios.delete(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      console.log(response.data);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      router.push("/articles");
    }
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

export default DeleteArticleDialog;
