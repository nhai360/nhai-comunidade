import { EditorState, convertToRaw } from "draft-js";

export function convertToText(editorState: EditorState) {
  const contentState = editorState.getCurrentContent();
  const rawContentState = convertToRaw(contentState);

  const result = rawContentState.blocks.reduce<string | null>(
    (appendedText, block) => {
      if (appendedText !== null) {
        return `${appendedText}\n${block.text}`;
      }

      return block.text;
    },
    null,
  );

  return result;
}
