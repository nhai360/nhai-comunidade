import { default as ReactSelect } from "react-select";
import { useUserPlaylists } from "@/client/videos/useUserPlaylists";
import { useAuthContext } from "@/contexts";
import * as S from "../../../ui/Field/Field.styles";
import styles from "./styles.module.scss";
import { components } from "react-select";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Video } from "@/client/videos";
import { Label, Typography } from "@/ui";
import { Check } from "@phosphor-icons/react";

type Props = {
  playlist: any;
  setPlaylist: Dispatch<SetStateAction<any>>;
};

export function PlaylistsSelector({ playlist, setPlaylist }: Props) {
  const { session } = useAuthContext();
  const { userplaylists, isLoading, isError } = useUserPlaylists({
    userId: session?.userId,
  });

  const playlistsList: any =
    userplaylists?.map((playlist) => {
      return { value: playlist?.id, label: playlist?.title };
    }) || [];

  const customStyles = {
    container: (provided: any, state: any) => ({
      ...provided,
      margin: "0 2px",
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      borderRadius: "12px",
      border: "none",
      backgroundColor: "#f2f2f2",
      padding: 8,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#f23d80" : provided.backgroundColor,
      color: state.isSelected ? "white" : provided.color,
      "&:hover": { backgroundColor: state.isSelected ? "#f23d80" : "#fde3ed" },
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      color: "#333",
    }),
  };

  const Option = (props: any) => {
    return (
      <div>
        <components.Option {...props}>
          <label>{props.label}</label>{" "}
          {props.isSelected && <Check color="#fff" />}
        </components.Option>
      </div>
    );
  };

  return (
    <>
      <S.Container>
        <S.LabelContainer>
          <Label>Playlist</Label>

          <Typography.Text size="body3" color="secondary">
            Opcional
          </Typography.Text>
        </S.LabelContainer>

        <ReactSelect
          options={playlistsList}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          isLoading={isLoading}
          components={{
            Option,
          }}
          isClearable
          styles={{ ...customStyles }}
          onChange={(selected) => setPlaylist(selected)}
          value={playlist}
          placeholder={"Selecione a playlist"}
          noOptionsMessage={() => "Você não tem nenhuma playlist"}
        />

        {isError && (
          <Typography.Text as="small" color="pink">
            Não foi possível carregar suas playlists
          </Typography.Text>
        )}
      </S.Container>
    </>
  );
}
