import {
  ComponentProps,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import Editor from "@draft-js-plugins/editor";
import {
  EditorProps,
  EditorState,
  RawDraftContentState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";

import { EmojiSuggestions, plugins } from "./plugins";

import * as S from "./TextArea.styles";

type ExternalProps = Partial<EditorProps> &
  UseControllerProps<FieldValues, FieldPath<FieldValues>> &
  ComponentProps<typeof S.Container>;

type Props = {
  autoFocus?: boolean;
  defaultValue?: RawDraftContentState;
} & Omit<ExternalProps, "defaultValue">;

export function TextArea({
  name,
  control,
  rules,
  shouldUnregister,
  color,
  css,
  defaultValue,
  autoFocus,
  onFocus,
  onBlur,
  ...rest
}: Props) {
  const editorRef = useRef<Editor>(null);

  const { field } = useController({
    name,
    control,
    rules,
    shouldUnregister,
    defaultValue,
  });

  const [isFocused, setIsFocused] = useState(false);

  const [editorState, setEditorState] = useState(() => {
    if (field.value) {
      return EditorState.createWithContent(convertFromRaw(field.value));
    }

    return EditorState.createEmpty();
  });

  useEffect(() => {
    if (autoFocus && editorRef?.current) {
      setIsFocused(true);
      editorRef?.current?.focus();
    }
  }, [autoFocus]);

  function handleChange(newEditorState: EditorState) {
    const contentState = newEditorState.getCurrentContent();

    setEditorState(newEditorState);
    field.onChange(convertToRaw(contentState));
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
      <EmojiSuggestions />
    </S.Container>
  );
}
