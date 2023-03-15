import { styled } from "@/../stitches.config";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  maxWidth: "459px",
  marginInline: "auto",

  paddingBlock: "$32 $28",

  span: {
    marginTop: "$3",
  },
});
