import styles from "./styles.module.scss";
import { Avatar, Button, Dialog, Loading, Success } from "@/ui";
import { useEffect, useRef, useState } from "react";
import { OutputData } from "@editorjs/editorjs";

import dynamic from "next/dynamic";
import { useAuthContext } from "@/contexts";
import { useUser } from "@/client/users";
import { getInitials } from "@/lib/string";
import { Warning } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import { useArticle } from "@/client/articles/useArticle";
import { useRouter } from "next/router";
import { useCreateArticle } from "@/client/articles/useCreateArticle";
import { useUpdateArticle } from "@/client/articles/useUpdateArticle";

const EditorBlock = dynamic(() => import("./EditorBlock"), {
  ssr: false,
});

type Props = {
  onClose: () => void;
  type: "create" | "edit";
  editData?: any;
};

const CreateArticleDialog = ({ onClose, type, editData }: Props) => {
  const router = useRouter();
  const { articleId } = router.query;
  const { session } = useAuthContext();
  const [error, setError] = useState(false);
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/articles/`;

  const { user } = useUser({
    id: session?.userId,
  });

  const { article } = useArticle({
    articleId: articleId as string,
  });

  const {
    createArticle,
    isLoading: isCreateLoading,
    isError: isCreateError,
  } = useCreateArticle();

  const {
    updateArticle,
    isLoading: isUpdateLoading,
    isError: isUpdateError,
  } = useUpdateArticle();

  const [data, setData] = useState<OutputData>();

  const editorRendererType = type === "create" ? data : JSON.parse(editData);
  const buttonTitle = type === "create" ? "Publicar" : "Republicar";

  const handleCreate = async (requestBody: any) => {
    createArticle(requestBody, {
      onSuccess: (article) => {
        toast.success("Artigo publicado com sucesso!");
        onClose();
      },
      onError: () => {
        toast.error("Não foi possível postar o seu artigo. Tente novamente");
      },
    });
  };

  const handleEdit = async (requestBody: any) => {
    updateArticle(
      { articleId: String(articleId), body: requestBody },
      {
        onSuccess: (article) => {
          toast.success("Artigo alterado com sucesso!");
          onClose();
          router.push("/articles");
        },
        onError: () => {
          toast.error("Não foi possível alterar o seu artigo. Tente novamente");
        },
      }
    );
  };

  async function handleArticle() {
    try {
      const hasHeader = data?.blocks.find(
        (block: any) => block.type === "header"
      );
      if (!hasHeader) {
        setError(true);
        return;
      }
      const hasImage = data?.blocks.find(
        (block: any) => block.type === "image"
      );
      if (!hasImage) {
        setError(true);
        return;
      }
      const title = hasHeader?.data?.text;

      const requestBody = {
        title,
        content: JSON.stringify(data),
      };

      if (type === "create") {
        handleCreate(requestBody);
      }

      if (type === "edit") {
        handleEdit(requestBody);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const loading = isUpdateLoading || isCreateLoading;

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <Dialog.Content>
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.titleContainer}>
                <Avatar
                  progressBar
                  alt={user?.fullName}
                  src={user?.profilePicture?.url}
                  fallback={getInitials(user?.fullName)}
                />
                <h2>{type === "create" ? "Criar" : "Editar"} Artigo</h2>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {error && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <Warning color="red" size={20} />
                    <span style={{ color: "red" }}>
                      Título e Imagem obrigatórios...
                    </span>
                  </div>
                )}
                <Button
                  className={styles.articleButton}
                  onClick={handleArticle}
                >
                  {!loading ? <h3>{buttonTitle}</h3> : <Loading />}
                </Button>
              </div>
            </div>

            <div style={{ marginTop: 132, zIndex: 0 }}>
              <EditorBlock
                data={editorRendererType}
                onChange={setData}
                holder="editorjs-container"
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

export default CreateArticleDialog;
