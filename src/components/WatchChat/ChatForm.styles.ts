import { styled } from "@/../stitches.config";
import { Typography } from "@/ui";

export const FormContainer = styled("form", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  columnGap: "$2",
  maxWidth: "488px",
  width: "100%",
  padding: "$6 $3",
  overflowY: "auto",

  "&::-webkit-scrollbar": {
    width: 0,
    height: 0,
    display: "none",
  },

  "-ms-overflow-style": "none",
  scrollbarWidth: "none",
});
