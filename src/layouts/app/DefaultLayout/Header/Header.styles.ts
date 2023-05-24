import { styled } from "@/../stitches.config";

export const Container = styled("header", {
  position: "sticky",
  top: 0,

  background: "$neutral100",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  borderBottom: "1px solid $neutral200",
  zIndex: "$fixed",

  padding: "$4 $2",

  ".avatarLink": {
    width: "52px",
    height: "52px",
  },
});
