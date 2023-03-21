import { styled } from "@/../stitches.config";

export const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$4",
});

export const AvatarGroup = styled("div", {
  display: "flex",
  alignItems: "center",

  "*": {
    border: "4px solid $neutral100",
    borderLeft: 0,

    "&:not(:first-child) *": {
      marginLeft: "-25px",
      border: "4px solid $neutral100",
    },
  },
});
