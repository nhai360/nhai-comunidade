import { ComponentProps, SyntheticEvent, useRef, useState } from "react";

import {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseControllerProps,
  useController,
} from "react-hook-form";

import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
import { EditorProps, EditorState, RawDraftContentState } from "draft-js";

import { convertToText } from "@/lib/draftjs";

import { usePlugins } from "./usePlugins";
import * as S from "./TextArea.styles";

type ExternalProps<T extends FieldValues> = Partial<EditorProps> &
  UseControllerProps<T, FieldPath<T>> &
  ComponentProps<typeof S.Container>;

export type TextAreaProps<T extends FieldValues> = {
  defaultValue?: RawDraftContentState;
  emojiSelectPosition?: "top" | "bottom";
} & Omit<ExternalProps<T>, "defaultValue">;

export function TextArea<T extends FieldValues>({
  name,
  control,
  rules,
  shouldUnregister,
  color,
  css,
  defaultValue,
  emojiSelectPosition = "top",
  onFocus,
  onBlur,
  ...rest
}: TextAreaProps<T>) {
  const editorRef = useRef<Editor>(null);

  const { plugins, EmojiSelect, EmojiSuggestions } = usePlugins({
    emojiSelectPosition,
  });

  const { field } = useController({
    name,
    control,
    rules,
    shouldUnregister,
    defaultValue: defaultValue as PathValue<T, Path<T>>,
  });

  const [isFocused, setIsFocused] = useState(false);

  const [editorState, setEditorState] = useState(
    createEditorStateWithText(field.value ?? ""),
  );

  function handleChange(newEditorState: EditorState) {
    setEditorState(newEditorState);
    field.onChange(convertToText(newEditorState));
  }

  function handleFocus(event: SyntheticEvent) {
    setIsFocused(true);
    editorRef?.current?.focus();

    onFocus && onFocus(event);
  }

  function handleBlur(event: SyntheticEvent) {
    setIsFocused(false);

    onBlur && onBlur(event);
  }

  return (
    <S.Container
      focus={isFocused}
      onClick={handleFocus}
      color={color}
      css={css}
    >
      <Editor
        {...rest}
        ref={editorRef}
        editorState={editorState}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        plugins={plugins}
      />
      <EmojiSelect />
      <EmojiSuggestions />
    </S.Container>
  );
}
