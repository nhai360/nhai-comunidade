import styles from "./styles.module.scss";
import { Avatar, Button, Dialog, Loading, Success } from "@/ui";
import { useEffect, useRef, useState } from "react";
import { OutputData } from "@editorjs/editorjs";

import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import axios from "axios";
import { getToken } from "@/lib/auth";
import dynamic from "next/dynamic";
import { useAuthContext } from "@/contexts";
import { useUser } from "@/client/users";
import { getInitials } from "@/lib/string";
import { Warning } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import { useArticle } from "@/client/articles/useArticle";
import { useRouter } from "next/router";

const EditorBlock = dynamic(() => import("./EditorBlock"), {
  ssr: false,
});

type Props = {
  onClose: () => void;
  type: "create" | "edit";
  editData?: any;
};

const CreateArticleDialog = ({ onClose, type, editData }: Props) => {
  // const router = useRouter();
  // const { articleId } = router.query;
  // const { session } = useAuthContext();
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);
  // const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/articles/`;

  // const { user } = useUser({
  //   id: session?.userId,
  // });

  // const { article } = useArticle({
  //   articleId: articleId as string,
  // });

  // const [data, setData] = useState<OutputData>();

  // const editorRendererType = type === "create" ? data : JSON.parse(editData);
  // const buttonTitle = type === "create" ? "Publicar" : "Republicar";

  // console.log(editData);

  // const handleCreate = async (requestBody: any) => {
  //   const response = await axios.post(apiUrl, requestBody, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${getToken()}`,
  //     },
  //   });
  //   toast.success("Artigo publicado com sucesso!");
  //   onClose();
  //   return response;
  // };

  // const handleEdit = async (requestBody: any) => {
  //   const response = await axios.patch(`${apiUrl + article?.id}`, requestBody, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${getToken()}`,
  //     },
  //   });

  //   toast.success("Artigo alterado com sucesso!");
  //   onClose();
  //   router.push('/articles')
  //   return response;
  // };

  // async function handleArticle() {
  //   try {
  //     setIsLoading(true);
  //     const hasHeader = data?.blocks.find(
  //       (block: any) => block.type === "header"
  //     );
  //     if (!hasHeader) {
  //       setError(true);
  //       return;
  //     }
  //     const hasImage = data?.blocks.find(
  //       (block: any) => block.type === "image"
  //     );
  //     if (!hasImage) {
  //       setError(true);
  //       return;
  //     }
  //     const title = hasHeader?.data?.text;

  //     const requestBody = {
  //       title,
  //       content: JSON.stringify(data),
  //     };

  //     if (type === "create") {
  //       handleCreate(requestBody);
  //     }

  //     if (type === "edit") {
  //       handleEdit(requestBody);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        {/* <Dialog.Content>
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
                  {!isLoading ? <h3>{buttonTitle}</h3> : <Loading />}
                </Button>
              </div>
            </div>

            <EditorBlock
              data={editorRendererType}
              onChange={setData}
              holder="editorjs-container"
            />
          </div>
        </Dialog.Content> */}
      </Dialog>
    </>
  );
};

export default CreateArticleDialog;
