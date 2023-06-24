import { styled } from "@/../stitches.config";

export const Container = styled("header", {
  position: "sticky",
  top: 0,

  background: "$neutral100",
  height: "56px",
  padding: "32px 0",

  display: "flex",
  alignItems: "center",

  borderBottom: "1px solid $neutral200",
  zIndex: "$fixed",
});

export const Content = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  width: "100%",

  marginInline: "auto",
  paddingInline: "$4",

  "@tablet": {
    justifyContent: "center",
  },
});

export const Actions = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$6",

  "@tablet": {
    display: "none",
  },
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
