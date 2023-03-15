import { styled } from "@/../stitches.config";
import { Typography } from "@/ui";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100vh",
  paddingBlock: "$16",
  background: "$neutral100",
});

export const Content = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginBlock: "auto",
});

export const Footer = styled("footer", {
  marginTop: "auto",
});

export const BackLink = styled(Typography.Link, {
  marginInline: "auto",
});
