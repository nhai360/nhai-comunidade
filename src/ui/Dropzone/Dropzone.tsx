import { ForwardRefRenderFunction, forwardRef, useMemo } from "react";
import ReactDropzone from "react-dropzone";
import { FieldPath, UseControllerProps, useController } from "react-hook-form";

import { Typography } from "@/ui";
import { TrashIcon } from "@/ui/_icons";

import { UploadIcon } from "./UploadIcon";
import * as S from "./Dropzone.styles";

const DropzoneComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  UseControllerProps<any, FieldPath<any>>
> = (props, ref) => {
  const { field } = useController(props);

  const previewUrl = useMemo(() => {
    if (field.value) {
      return URL.createObjectURL(field.value);
    }

    return null;
  }, [field]);

  function handleDropAccepted(acceptedFiles: File[]) {
    field.onChange(acceptedFiles[0]);
  }

  function handleRemoveFile() {
    field.onChange(undefined);
  }

  if (previewUrl) {
    return (
      <S.Preview>
        <S.PreviewRemoveButton
          icon
          type="button"
          variant="transparent"
          onClick={handleRemoveFile}
        >
          <TrashIcon />
        </S.PreviewRemoveButton>
        <S.ThumbnailImage src={previewUrl} />
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
