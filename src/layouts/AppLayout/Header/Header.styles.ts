import { styled } from "@/../stitches.config";

export const Container = styled("header", {
  position: "sticky",
  top: 0,

  background: "$neutral100",
  height: "80px",

  display: "flex",
  alignItems: "center",

  borderBottom: "1px solid $neutral200",
});

export const Content = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  maxWidth: "1376px",
  width: "100%",

  marginInline: "auto",
});

export const Actions = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$6",
});

export const UserContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$3",
});

export const UserInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  rowGap: "$1",
});
