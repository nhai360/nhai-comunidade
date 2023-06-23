import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactSelect, { components } from "react-select";
import * as S from "../../../ui/Field/Field.styles";
import { Label, Typography } from "@/ui";
import { Check } from "@phosphor-icons/react";
import { handleProgramas } from "@/services/firebase/programas";

type Props = {
  playlist: any;
  setPlaylist: Dispatch<SetStateAction<any>>;
  handleCreatePlaylist: () => void;
  isOpicional?: boolean;
};

export function ProgramSelector({
  playlist,
  setPlaylist,
  handleCreatePlaylist,
  isOpicional = true,
}: Props) {
  const [programas, setProgramas] = useState<any[]>([]);

  useEffect(() => {
    handleProgramas(setProgramas);
  }, []);

  const playlistsList: any =
    programas?.map((playlist) => {
      return { value: playlist?._id, label: playlist?.name };
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
          <Label>Programa</Label>
        </S.LabelContainer>

        <ReactSelect
          options={playlistsList}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
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
        <Typography.Link onClick={handleCreatePlaylist} as="small" color="pink">
          Novo programa +
        </Typography.Link>
      </S.Container>
    </>
  );
}
