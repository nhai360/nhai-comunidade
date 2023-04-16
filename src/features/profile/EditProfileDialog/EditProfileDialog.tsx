import { useRef } from "react";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, Field, Input, Loading, Success, TextArea } from "@/ui";
import { useAuthContext } from "@/contexts";
import {
  UpdateUserDecoder,
  UpdateUserParams,
  useUpdateUser,
  useUser,
} from "@/client/users";

import { UploadAvatar } from "./UploadAvatar";
import * as S from "./EditProfileDialog.styles";
import { useUpload } from "@/client/media";
import { toast } from "react-toastify";

type Props = {
  onClose: () => void;
};

export function EditProfileDialog({ onClose }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const { session } = useAuthContext();

  const { user, isLoading: isLoadingUser } = useUser({
    id: session?.userId,
  });

  const form = useForm<UpdateUserParams>({
    defaultValues: {
      fullName: user?.fullName,
      nickname: user?.nickname ?? undefined,
      bio: user?.bio ?? undefined,
    },
    resolver: zodResolver(UpdateUserDecoder),
  });

  const { updateUser, isSuccess, isLoading: isUpdating } = useUpdateUser();
  const { upload, isLoading: isUploading } = useUpload();

  const isLoading = isUpdating || isUploading;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  function handleUpdateUser(params: UpdateUserParams) {
    if (!user) return;

    if (params.avatar) {
      upload(params.avatar, {
        onSuccess: (media) => {
          updateUser(
            {
              userId: user.id,
              media,
              ...params,
            },
            {
              onError: () => {
                toast.error(
                  "Não foi possível atualizar seu perfil. Tente novamente.",
                );
              },
            },
          );
        },
        onError: () => {
          toast.error("Não foi possível enviar sua imagem. Tente novamente.");
        },
      });
    }

    updateUser({
      userId: user.id,
      ...params,
    });
  }

  if (isLoadingUser) {
    return (
      <Dialog open onOpenChange={onClose}>
        <Dialog.Content>
          <Dialog.Header title="Carregando..." closable />
          <S.DialogBody
            css={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loading />
          </S.DialogBody>
        </Dialog.Content>
      </Dialog>
    );
  }

  if (!user) {
    return null;
  }

  if (isSuccess) {
    return (
      <Dialog open onOpenChange={onClose}>
        <Dialog.Content>
          <Dialog.Header closable={false} />
          <Dialog.Body>
            <Success
              title="Informações alteradas com sucesso"
              description="É fundamental manter suas informações atualizadas para garantir que sua presença online reflita quem você é atualmente e as mudanças que possam ter ocorrido desde a última atualização"
              onClose={onClose}
            />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog>
    );
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Header closable title="Editar Perfil" />
        <S.DialogBody>
          <FormProvider {...form}>
            <S.Form ref={formRef} onSubmit={handleSubmit(handleUpdateUser)}>
              <UploadAvatar />
              <Field label="Nome">
                <Input
                  placeholder="Digite seu nome"
                  {...register("fullName")}
                />
              </Field>
              <Field label="Apelido">
                <Input
                  placeholder="Digite seu apelido"
                  {...register("nickname")}
                />
              </Field>
              <Field label="Localização">
                <Input
                  placeholder="Digite sua localização"
                  // {...register("location")}
                />
              </Field>
              <Field label="Bio" errorText={errors.bio?.message}>
                <TextArea
                  control={control}
                  name="content"
                  placeholder="Conte um pouco sobre você"
                  emojiSelectPosition="top"
                  shouldUnregister
                  error={!!errors.bio?.message}
                  css={{
                    ".public-DraftEditor-content": {
                      maxHeight: "135px",
                    },
                  }}
                />
              </Field>
            </S.Form>
          </FormProvider>
        </S.DialogBody>
        <S.DialogFooter>
          <S.SubmitButton
            size="medium"
            loading={isLoading}
            onClick={handleSubmit(handleUpdateUser)}
          >
            Salvar alterações
          </S.SubmitButton>
        </S.DialogFooter>
      </Dialog.Content>
    </Dialog>
  );
}
