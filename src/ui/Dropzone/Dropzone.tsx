import { ForwardRefRenderFunction, forwardRef } from "react";
import ReactDropzone from "react-dropzone";
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import { Typography } from "@/ui";
import { TrashIcon } from "@/ui/_icons";

import { UploadIcon } from "./UploadIcon";
import * as S from "./Dropzone.styles";

const DropzoneComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  UseControllerProps<FieldValues, FieldPath<FieldValues>>
> = (props, ref) => {
  const { field } = useController(props);

  function handleDropAccepted(acceptedFiles: File[]) {
    field.onChange({
      ...acceptedFiles[0],
      preview: URL.createObjectURL(acceptedFiles[0]),
    });
  }

  function handleRemoveFile() {
    field.onChange(undefined);
  }

  if (field.value) {
    return (
      <S.Preview>
        <S.PreviewRemoveButton
          icon
          variant="transparent"
          onClick={handleRemoveFile}
        >
          <TrashIcon />
        </S.PreviewRemoveButton>
        <S.ThumbnailImage src={field.value.preview} />
      </S.Preview>
    );
  }

  return (
    <ReactDropzone
      accept={{ "image/*": [] }}
      onDropAccepted={handleDropAccepted}
    >
      {({ getRootProps, getInputProps }) => (
        <S.Container {...getRootProps()}>
          <input ref={ref} {...getInputProps()} />
          <UploadIcon />
          <Typography.Text size="body1" color="blue" weight="bold">
            Selecione imagens para compartilhar
          </Typography.Text>
        </S.Container>
      )}
    </ReactDropzone>
  );
};

export const Dropzone = forwardRef(DropzoneComponent);
