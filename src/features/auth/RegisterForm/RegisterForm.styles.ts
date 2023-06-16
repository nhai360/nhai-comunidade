import { styled } from "@/../stitches.config";
import { Typography } from "@/ui";

export const FormContainer = styled("form", {
  display: "flex",
  flexDirection: "column",
  rowGap: "$4",

  margin: "$4 0",
  maxWidth: "488px",
  width: "100%",

  overflowY: "auto",

  "&::-webkit-scrollbar": {
    width: 0,
    height: 0,
    display: "none",
  },

  "-ms-overflow-style": "none",
  scrollbarWidth: "none",
});

export const FieldContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  rowGap: "$4",
});

export const RecoverPasswordLink = styled(Typography.Link, {
  marginInline: "auto",
});
