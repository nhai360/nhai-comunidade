import { styled } from "@/../stitches.config";

export const Container = styled("main", {
  height: "100vh",
  paddingBlock: "$8",
  background:
    "linear-gradient(90deg, #F23D80 0%, #FFC700 30.98%, #63D130 60.93%, #00A0FF 99.14%)",

  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
});

export const Content = styled("section", {
  position: "relative",

  background: "$neutral100",
  borderTopRightRadius: "$large",
  borderBottomRightRadius: "$large",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const TitleContainer = styled("section", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",

  h1: {
    maxWidth: "492px",
    textAlign: "center",
  },
});
