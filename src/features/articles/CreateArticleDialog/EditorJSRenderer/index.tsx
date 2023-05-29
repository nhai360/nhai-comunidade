import { OutputData } from "@editorjs/editorjs";
import React from "react";

import styles from "./styles.module.scss";

//use require since editorjs-html doesn't have types
import editorJsHtml from "editorjs-html";
const EditorJsToHtml = editorJsHtml(
  // Your custom editorjs generated block
  {
    type: "attaches",
    data: {
      file: {
        url: "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
        size: 91,
        name: "hero.jpg",
        extension: "jpg",
      },
      title: "Hero",
    },
  }
);

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
