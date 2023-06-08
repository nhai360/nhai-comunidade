//./components/Editor
import React, { memo, useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import axios from "axios";
import { getToken } from "@/lib/auth";

import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import AttachesTool from "@editorjs/attaches";

import styles from "./styles.module.scss";
import { useAuthContext } from "@/contexts";

type IUploadFile = {
  file: any;
  typeFile: "IMAGE" | "DOCUMENT";
};

//props
type Props = {
  data?: OutputData;
  onChange(val: OutputData): void;
  holder: string;
};

const EditorBlock = ({ data, onChange, holder }: Props) => {
  //add a reference to editor
  const ref = useRef<EditorJS>();

  const { session } = useAuthContext();

  async function createMedia(fileType: "IMAGE" | "DOCUMENT") {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/media/`;

      const requestBody = {
        category: fileType,
      };

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      return response?.data?.id;
    } catch (error) {
      console.error(error);
    }
  }

  async function uploadFile(file: any, fileType: "IMAGE" | "DOCUMENT") {
    try {
      const mediaId = await createMedia(fileType);
      if (mediaId === "") {
        console.log("media error");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/media/${mediaId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      // Trate os erros caso ocorram
      console.error(error);
    }
  }

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        placeholder: "Comece seu artigo aqui...",
        tools: {
          header: {
            class: Header as any,
            shortcut: "CMD+SHIFT+H",
            toolbox: {
              title: "Título",
            },
            inlineToolbar: true,
            config: {
              levels: [1, 2, 3, 4],
              defaultLevel: 1,
            },
          },
          image: {
            class: ImageTool,
            config: {
              /**
               * Custom uploader
               */
              uploader: {
                /**x
                 * Upload file to the server and return an uploaded image data
                 * @param {File} file - file selected from the device or pasted by drag-n-drop
                 * @return {Promise.<{success, file: {url}}>}
                 */
                uploadByFile(file: string) {
                  return uploadFile(file, "IMAGE").then((data) => {
                    return {
                      success: 1,
                      file: {
                        url: data.url,
                        // any other image data you want to store, such as width, height, color, extension, etc
                      },
                    };
                  });
                },

                // /**
                //  * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
                //  * @param {string} url - pasted image URL
                //  * @return {Promise.<{success, file: {url}}>}
                //  */
                // uploadByUrl(url: string) {
                //   return downloadImage(url).then((image) => {
                //     return {
                //       success: 1,
                //       file: {
                //         url: image,
                //         // any other image data you want to store, such as width, height, color, extension, etc
                //       },
                //     };
                //   });
                // },
              },
            },
          },
          attaches: {
            class: AttachesTool,
            config: {
              types: "application/pdf",
              uploader: {
                /**x
                 * Upload file to the server and return an uploaded image data
                 * @param {File} file - file selected from the device or pasted by drag-n-drop
                 * @return {Promise.<{success, file: {url}}>}
                 */
                uploadByFile(file: string) {
                  return uploadFile(file, "DOCUMENT").then((data) => {
                    console.log("XXXXX: ", data);

                    const bytes = data.sizeInBytes;
                    const megabytes = bytes / (1024 * 1024); // Conversão para megabytes

                    // Arredondando para duas casas decimais
                    const roundedMegabytes = Math.round(megabytes * 100) / 100;

                    return {
                      success: 1,
                      file: {
                        url: data.url,
                        name: data.name,
                        size: roundedMegabytes,
                        // any other image data you want to store, such as width, height, color, extension, etc
                      },
                    };
                  });
                },

                // /**
                //  * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
                //  * @param {string} url - pasted image URL
                //  * @return {Promise.<{success, file: {url}}>}
                //  */
                // uploadByUrl(url: string) {
                //   return downloadImage(url).then((image) => {
                //     return {
                //       success: 1,
                //       file: {
                //         url: image,
                //         // any other image data you want to store, such as width, height, color, extension, etc
                //       },
                //     };
                //   });
                // },
              },
            },
          },
        },
        data,
        async onChange(api, event) {
          const data = await api.saver.save();
          console.log(data);
          onChange(data);
        },
        /**
         * Internationalzation config
         */
        i18n: {
          /**
           * @type {I18nDictionary}
           */
          messages: {
            /**
             * Other below: translation of different UI components of the editor.js core
             */
            ui: {
              blockTunes: {
                toggler: {
                  "Click to tune": "Clique para ajustar",
                  "Click to delete": "Clique para deletar",
                  "or drag to move": "ou arraste para mover",
                },
              },
              inlineToolbar: {
                converter: {
                  "Convert to": "Converter para",
                },
              },
              toolbar: {
                toolbox: {
                  Add: "Adicionar",
                  Filter: "Filtro",
                },
              },
            },

            /**
             * Section for translation Tool Names: both block and inline tools
             */

            toolNames: {
              Text: "Texto",
              Heading: "Título",

              List: "Lista",
              Image: "Imagem",

              Warning: "Aviso",
              Attachment: "Arquivo",
              Checklist: "Lista de verificação",
              Quote: "Citação",
              Code: "Código",
              Delimiter: "Delimitador",

              "Raw HTML": "HTML bruto",
              Table: "Tabela",
              Link: "Link",
              Marker: "Marcador",
              Bold: "Negrito",
              Italic: "Itálico",
              InlineCode: "Código em linha",
            },

            /**
             * Section for passing translations to the external tools classes
             */
            tools: {
              /**
               * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
               * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
               */

              warning: {
                // <-- 'Warning' tool will accept this dictionary section
                Title: "Título",
                Message: "Mensagem",
              },

              /**
               * Link is the internal Inline Tool
               */
              link: {
                "Add a link": "Adicionar Link",
              },
              /**
               * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
               */
              stub: {
                "The block can not be displayed correctly.":
                  "Não foi possível mostrar o bloco corretamente",
              },
            },

            /**
             * Section allows to translate Block Tunes
             */
            blockTunes: {
              /**
               * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
               * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
               *
               * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
               */
              delete: {
                Delete: "Deletar",
                "Click to delete": "Clique para deletar",
              },
              moveUp: {
                "Move up": "Mover para cima",
              },
              moveDown: {
                "Move down": "Mover para baixo",
              },
            },
          },
        },
      });
      ref.current = editor;
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <div id={holder} className={styles.editorJScontent} />;
};

export default memo(EditorBlock);
