import {
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
  useMemo,
} from "react";
import ReactDropzone, {
  DropEvent,
  DropzoneProps,
  FileRejection,
} from "react-dropzone";
import { FieldPath, UseControllerProps, useController } from "react-hook-form";
import { toast } from "react-toastify";

import { Typography } from "@/ui";
import { TrashIcon } from "@/ui/_icons";

import * as S from "./UploadThumbnail.styles";
import { UploadIcon } from "@/ui/Dropzone/UploadIcon";

const MAX_SIZE = 1024 * 1024; // 1mb

type Props = {
  children?: ReactNode;
} & UseControllerProps<any, FieldPath<any>> &
  Omit<DropzoneProps, "children">;

const UploadThumbnailComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (
  {
    children = "Selecione imagens para compartilhar",
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
    maxSize = MAX_SIZE,
    onDropAccepted,
    onDropRejected,
    ...props
  },
  ref,
) => {
  const { field } = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  const previewUrl = useMemo(() => {
    if (field.value) {
      return URL.createObjectURL(field.value);
    }

    return null;
  }, [field]);

  function handleDropAccepted(acceptedFiles: File[], event: DropEvent) {
    field.onChange(acceptedFiles[0]);

    onDropAccepted && onDropAccepted(acceptedFiles, event);
  }

  function handleDropRejected(
    fileRejections: FileRejection[],
    event: DropEvent,
  ) {
    toast.error("Imagem não suportada. Use apenas imagens com até 1MB");

    onDropRejected && onDropRejected(fileRejections, event);
  }

  function handleRemoveFile() {
    field.onChange(undefined);
  }

  if (previewUrl) {
    return (
      <S.Preview>
        <S.ThumbnailImage src={previewUrl} />
        <S.PreviewRemoveButton
          icon
          type="button"
          variant="transparent"
          onClick={handleRemoveFile}
        >
          <TrashIcon />
        </S.PreviewRemoveButton>
      </S.Preview>
    );
  }

  return (
    <ReactDropzone
      accept={{ "image/*": [] }}
      onDropRejected={handleDropRejected}
      onDropAccepted={handleDropAccepted}
      maxSize={maxSize}
      {...props}
    >
      {({ getRootProps, getInputProps }) => (
        <S.Container {...getRootProps()}>
          <input ref={ref} {...getInputProps()} />
          <UploadIcon />
          <Typography.Text size="body1" color="blue" weight="bold">
            {children}
          </Typography.Text>
        </S.Container>
      )}
    </ReactDropzone>
  );
};

export const UploadThumbnail = forwardRef(UploadThumbnailComponent);
