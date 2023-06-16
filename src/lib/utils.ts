import { CreateStyled } from "@emotion/styled";

export const transientOptions: Parameters<CreateStyled>[1] = {
  shouldForwardProp: (propName: string) => !propName.startsWith("$"),
};

export const invalidChatText = (string: string) => {
  // Verifica o tamanho da string
  if (string.length < 10) {
    return false;
  }

  // Define uma lista de caracteres especiais comuns em desenhos
  var specialCharacters = ["-", "|", "*", "+", "/", "\\", "[", "]", "(", ")"];

  // Conta a quantidade de caracteres especiais na string
  var specialCharCount = 0;
  for (var i = 0; i < string.length; i++) {
    if (specialCharacters.includes(string[i])) {
      specialCharCount++;
    }
  }

  // Calcula a proporção de caracteres especiais
  var specialCharRatio = specialCharCount / string.length;
  if (specialCharRatio < 0.3) {
    return false;
  }

  // Verifica se existem padrões repetidos na string
  var pattern = /([^\n]*)\n\1/g;
  if (pattern.test(string)) {
    return true;
  }

  return false;
};
