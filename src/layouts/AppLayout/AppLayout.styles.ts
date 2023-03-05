import { styled } from "@/../stitches.config";

export const Content = styled("main");

export const Sider = styled("aside", {
  position: "sticky",
  top: 0,
});

export const SimpleGrid = styled("div", {
  marginLeft: "80px",
  padding: "$6",
});

export const GridWithSider = styled("div", {
  marginLeft: "80px",
  padding: "$6",

  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "$6",
});
