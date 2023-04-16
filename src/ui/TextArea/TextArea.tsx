import {
  ComponentProps,
  ForwardRefRenderFunction,
  ReactNode,
  SyntheticEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
import { EditorProps, EditorState } from "draft-js";

import { convertToText } from "@/lib/draftjs";

import { usePlugins } from "./usePlugins";
import * as S from "./TextArea.styles";

type ExternalProps<T extends FieldValues> = Partial<EditorProps> &
  UseControllerProps<T, FieldPath<T>> &
  ComponentProps<typeof S.Container>;

export type TextAreaProps<T extends FieldValues> = {
  children?: ReactNode;
  emojiSelect?: boolean;
  emojiSelectPosition?: "top" | "bottom";
  reverseActions?: boolean;
} & ExternalProps<T>;

export type TextAreaRefProps = {
  clearInput: () => void;
  focus: () => void;
};

const ForwardTextArea: ForwardRefRenderFunction<
  TextAreaRefProps,
  TextAreaProps<any>
> = (
  {
    children,
    name,
    control,
    rules,
    shouldUnregister,
    color,
    css,
    defaultValue,
    emojiSelect = true,
    emojiSelectPosition = "top",
    reverseActions = false,
    error = false,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) => {
  const editorRef = useRef<Editor>(null);

  const { plugins, EmojiSelect, EmojiSuggestions } = usePlugins({
    emojiSelectPosition,
  });

  const { field } = useController({
    name,
    control,
    rules,
    shouldUnregister,
    defaultValue,
  });

  useImperativeHandle(ref, () => {
    return {
      clearInput: () => {
        setEditorState(EditorState.createEmpty());
        field.onChange("");
      },
      focus: () => {
        setIsFocused(true);
        editorRef?.current?.focus();
      },
    };
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
      error={error}
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
      <S.Actions
        onClick={(e) => e.stopPropagation()}
        css={{ flexDirection: reverseActions ? "row-reverse" : "row" }}
      >
        {children}
        {emojiSelect && <EmojiSelect />}
      </S.Actions>
      <EmojiSuggestions />
    </S.Container>
  );
};

export const TextArea = forwardRef(ForwardTextArea);
