import { OutputData } from "@editorjs/editorjs";
import React from "react";

import styles from "./styles.module.scss";

//use require since editorjs-html doesn't have types
import editorJsHtml from "editorjs-html";
import { DownloadSimple, FileArchive, FilePdf } from "@phosphor-icons/react";

function attaches(block: any) {
  console.log("Arquivo: ", block.data);

  const handleDownload = () => {
    // Lógica para obter o arquivo a ser baixado
    const fileUrl = block.data?.file?.url;

    // Cria um link temporário para o arquivo
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "file.pdf";
    link.target = "_blank";

    // Simula um clique no link para iniciar o download
    link.click();
  };
  return (
    <>
      <div className={styles.uploadFileContainer}>
        <div style={{ display: "flex" }}>
          <div className={styles.contentIcon}>
            <FileArchive size={24} />
          </div>
          <div className={styles.contentInfo}>
            <h6>{block ? block.data.title : 'File type'}</h6>
            <p>{block.data.size}</p>
          </div>
        </div>
        <button onClick={handleDownload} className={styles.contentDownload}>
          <DownloadSimple size={24} />
        </button>
      </div>
    </>
  );
}

const EditorJsToHtml = editorJsHtml({ attaches });

type Props = {
  data: OutputData;
};
type ParsedContent = string | JSX.Element;

const EditorJsRenderer = ({ data }: Props) => {
  const html = EditorJsToHtml.parse(data) as ParsedContent[];
  return (
    //✔️ It's important to add key={data.time} here to re-render based on the latest data.
    <div className={styles.contentContainer} key={data.time}>
      {html.map((item, index) => {
        console.log(item);
        if (typeof item === "string") {
          return (
            <div dangerouslySetInnerHTML={{ __html: item }} key={index}></div>
          );
        } else if (item.type === "attaches") {
          return (
            <div key={index}>
              <img src={item?.props.data.url} />
            </div>
          );
        } else if (item instanceof Error) {
          // Tratar o objeto Error aqui, exibindo uma mensagem de erro, por exemplo
          return <div key={index}>Erro ao renderizar conteúdo</div>;
        } else {
          return item;
        }
      })}
    </div>
  );
};

export default EditorJsRenderer;
