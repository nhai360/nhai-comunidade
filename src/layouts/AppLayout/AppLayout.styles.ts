import { styled } from "@/../stitches.config";

export const Content = styled("main");

export const Sider = styled("aside", {
  position: "sticky",
  top: 0,

  display: "flex",
  flexDirection: "column",
  gap: "$6",
});

export const SimpleGrid = styled("div", {
  marginLeft: "80px",
  padding: "$6",
});

export const GridWithSider = styled("div", {
  marginLeft: "80px",
  padding: "$6",

  display: "grid",
  gridTemplateColumns: "auto 416px",
  gap: "$6",
});
