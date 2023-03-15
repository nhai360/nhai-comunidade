import { FormProvider, useForm } from "react-hook-form";

import { Dialog, Field, Input } from "@/ui";

import * as S from "./EditProfileDialog.styles";

type Props = {
  onClose: () => void;
};

export function EditProfileDialog({ onClose }: Props) {
  const form = useForm();

  const { register } = form;

  return (
    <Dialog open onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Header closable title="Editar Perfil" />
        <S.DialogBody>
          <FormProvider {...form}>
            <S.Form>
              <Field label="Nome">
                <Input placeholder="Digite seu nome" {...register("name")} />
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
                  {...register("location")}
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
          <S.SubmitButton size="medium">Salvar alterações</S.SubmitButton>
        </S.DialogFooter>
      </Dialog.Content>
    </Dialog>
  );
}
