
import { OutputData } from "@editorjs/editorjs";
import React from "react";

import styles from './styles.module.scss'

//use require since editorjs-html doesn't have types
import editorJsHtml from "editorjs-html";
const EditorJsToHtml = editorJsHtml();

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
        if (typeof item === "string") {
          return (
            <div dangerouslySetInnerHTML={{ __html: item }} key={index}></div>
          );
        }
        return item;
      })}
    </div>
  );
};

export default EditorJsRenderer;
