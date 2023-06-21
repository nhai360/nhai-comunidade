import { styled } from "@/../stitches.config";
import { Typography } from "@/ui";

export const FormContainer = styled("form", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  columnGap: "$2",
  maxWidth: "488px",

  "@tablet": {
    maxWidth: "100%",
  },
  "@laptop": {
    maxWidth: "100%",
  },
  "@minLaptop": {
    maxWidth: "100%",
  },

  width: "100%",
  padding: "$3 $3 $6",
  overflowY: "auto",

  "&::-webkit-scrollbar": {
    width: 0,
    height: 0,
    display: "none",
  },

  "-ms-overflow-style": "none",
  scrollbarWidth: "none",
});
