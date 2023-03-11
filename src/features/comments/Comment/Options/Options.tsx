import { Checkbox, ProgressBar, Typography } from "@/ui";
import * as S from "./Options.styles";
import { useState } from "react";

type Props = {
  options: string[];
};

export function Options({ options }: Props) {
  const [selectedOption, setSelectedOption] = useState<string>();

  function handleChange(option: string) {
    if (selectedOption === option) {
      setSelectedOption(undefined);
    }

    setSelectedOption(option);
  }

  return (
    <S.OptionsList>
      {options.map((option) => (
        <S.OptionItem key={option}>
          <Checkbox.Controlled
            name={option}
            checked={selectedOption === option}
            onCheckedChange={() => handleChange(option)}
          />
          <S.Content>
            <S.Label>
              <Typography.Text size="body3" weight="bold">
                {option}
              </Typography.Text>
              <Typography.Text color="secondary" size="caption">
                326 votos
              </Typography.Text>
            </S.Label>
            <ProgressBar currentPercent={30} />
          </S.Content>
        </S.OptionItem>
      ))}
    </S.OptionsList>
  );
}
