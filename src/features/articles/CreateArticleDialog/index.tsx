import styles from "./styles.module.scss";
import { Dialog } from "@/ui";
import { useEffect, useRef, useState } from "react";
import { OutputData } from "@editorjs/editorjs";

import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import axios from "axios";
import { getToken } from "@/lib/auth";
import dynamic from "next/dynamic";

// important that we use dynamic loading here
// editorjs should only be rendered on the client side.
const EditorBlock = dynamic(() => import("./EditorBlock"), {
  ssr: false,
});

type Props = {
  onClose: () => void;
};

const CreateArticleDialog = ({ onClose }: Props) => {
  // const [articleData, setArticleData] = useState<any>({});

  const [data, setData] = useState<OutputData>();

  // Função para fazer o download da imagem e usar no copy url editorjs
  async function downloadImage(urlData: string) {
    try {
      const response = await axios.get(urlData, {
        responseType: "blob",
      });

      // Criar um URL temporário para a imagem
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Criar um link de download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "image.jpg");
      document.body.appendChild(link);

      // Clicar no link para iniciar o download
      link.click();

      // Remover o link após o download
      document.body.removeChild(link);
    } catch (error) {
      // Trate os erros caso ocorram
      console.error(error);
    }
  }

  //   if (isSuccess) {
  //     return (
  //       <Dialog open onOpenChange={onClose}>
  //         <Dialog.Content>
  //           <Dialog.Header closable={false} />
  //           <Dialog.Body>
  //             <Success
  //               title="Seu vídeo foi publicado com sucesso!"
  //               description="Agora que compartilhou seu vídeo com sua comunidade, é só esperar para ver as discussões interessantes que podem surgir."
  //               onClose={onClose}
  //             />
  //           </Dialog.Body>
  //         </Dialog.Content>
  //       </Dialog>
  //     );
  //   }

  async function createArticle() {
    try {
      const hasHeader = data?.blocks.find(
        (block: any) => block.type === "header"
      );
      if (!hasHeader) {
        return;
      }
      const hasImage = data?.blocks.find(
        (block: any) => block.type === "image"
      );
      if (!hasImage) {
        return;
      }
      const title = hasHeader?.data?.text;

      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}article/`;

      const requestBody = {
        title,
        content: JSON.stringify(data),
        images: [],
      };

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <Dialog.Content>
          <div className={styles.container}>
            <div className={styles.header}></div>

            <EditorBlock
              data={data}
              onChange={setData}
              holder="editorjs-container"
            />

            <button onClick={createArticle}>Enviar</button>
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

export default CreateArticleDialog;
