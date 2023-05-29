//./components/Editor
import React, { memo, useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import axios from "axios";
import { getToken } from "@/lib/auth";

import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";

import styles from "./styles.module.scss";

//props
type Props = {
  data?: OutputData;
  onChange(val: OutputData): void;
  holder: string;
};

const EditorBlock = ({ data, onChange, holder }: Props) => {
  //add a reference to editor
  const ref = useRef<EditorJS>();

  async function createMedia() {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/media/`;

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
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/media/${mediaId}/upload`,
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

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,

        placeholder: "Comece seu artigo aqui...",
        tools: {
          header: Header,
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
                  return uploadFile(file).then((data) => {
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
