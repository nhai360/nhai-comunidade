import EditorJS from "@editorjs/editorjs";

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
  const ejInstance: any = useRef();
  const [articleData, setArticleData] = useState<any>({});

  const [data, setData] = useState<OutputData>();

  async function createMedia() {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}media/`;

      const requestBody = {
        category: "IMAGE",
      };

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response?.data?.id;
    } catch (error) {
      console.error(error);
    }
  }

  async function uploadFile(file: any) {
    try {
      const mediaId = await createMedia();
      if (mediaId === "") {
        console.log("media error");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}media/${mediaId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      // Trate os erros caso ocorram
      console.error(error);
    }
  }

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

  // const initEditor = () => {
  //   const editor = new EditorJS({
  //     holder: "editorjs",
  //     onReady: () => {
  //       ejInstance.current = editor;
  //     },
  //     autofocus: true,
  //     onChange: async () => {
  //       let content = await editor.save();

  //       console.log(content);
  //       setArticleData(content);
  //     },
  //     // cria objeto POST
  //     // atualiza PUT
  //     //
  //     tools: {
  //       header: Header,
  //       image: {
  //         class: ImageTool,
  //         config: {
  //           /**
  //            * Custom uploader
  //            */
  //           uploader: {
  //             /**x
  //              * Upload file to the server and return an uploaded image data
  //              * @param {File} file - file selected from the device or pasted by drag-n-drop
  //              * @return {Promise.<{success, file: {url}}>}
  //              */
  //             uploadByFile(file: string) {
  //               return uploadFile(file).then((data) => {
  //                 return {
  //                   success: 1,
  //                   file: {
  //                     url: data.url,
  //                     // any other image data you want to store, such as width, height, color, extension, etc
  //                   },
  //                 };
  //               });
  //             },

  //             // /**
  //             //  * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
  //             //  * @param {string} url - pasted image URL
  //             //  * @return {Promise.<{success, file: {url}}>}
  //             //  */
  //             // uploadByUrl(url: string) {
  //             //   return downloadImage(url).then((image) => {
  //             //     return {
  //             //       success: 1,
  //             //       file: {
  //             //         url: image,
  //             //         // any other image data you want to store, such as width, height, color, extension, etc
  //             //       },
  //             //     };
  //             //   });
  //             // },
  //           },
  //         },
  //       },
  //     },
  //   });
  // };

  // useEffect(() => {
  //   if (ejInstance.current === null) {
  //     initEditor();
  //   }
  //   return () => {
  //     ejInstance?.current?.destroy();
  //     ejInstance.current = null;
  //   };
  // }, []);

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
      const hasHeader = articleData?.blocks.find(
        (block: any) => block.type === "header"
      );
      if (!hasHeader) {
        return;
      }
      const hasImage = articleData?.blocks.find(
        (block: any) => block.type === "image"
      );
      if (!hasImage) {
        return;
      }
      const title = hasHeader?.data?.text;

      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}article/`;

      const requestBody = {
        title,
        content: JSON.stringify(articleData),
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

            <button onClick={createArticle}>vai porra!!!</button>
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

export default CreateArticleDialog;
