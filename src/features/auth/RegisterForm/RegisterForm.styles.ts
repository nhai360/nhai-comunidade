import { styled } from "@/../stitches.config";
import { Typography } from "@/ui";

export const FormContainer = styled("form", {
  display: "flex",
  flexDirection: "column",
  rowGap: "$8",

  marginTop: "$8",
  maxWidth: "488px",
  width: "100%",
  maxHeight: "85vh",

  overflowY: "auto",
  padding: "$4",
});

export const FieldContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  rowGap: "$10",
});

export const RecoverPasswordLink = styled(Typography.Link, {
  marginInline: "auto",
});
