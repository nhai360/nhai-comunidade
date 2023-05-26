//./components/Editor
import React, { memo, useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import axios from "axios";
import { getToken } from "@/lib/auth";

import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";

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

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,

        placeholder: "Comece seu artigo...",
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
          onChange(data);
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

  return <div id={holder} />;
};

export default memo(EditorBlock);
