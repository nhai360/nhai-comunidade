import { useRef } from "react";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, Field, Input, Loading, Success } from "@/ui";
import { useAuthContext } from "@/contexts";
import {
  UpdateUserDecoder,
  UpdateUserParams,
  useUpdateUser,
  useUser,
} from "@/client/users";

import * as S from "./EditProfileDialog.styles";
import { UploadAvatar } from "./UploadAvatar";

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

  const { updateUser, isSuccess, isLoading } = useUpdateUser();

  const { register, handleSubmit } = form;

  function handleUpdateUser(params: UpdateUserParams) {
    if (!user) return;

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
              <Field label="Bio">
                <Input
                  placeholder="Conte um pouco sobre você"
                  {...register("bio")}
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
