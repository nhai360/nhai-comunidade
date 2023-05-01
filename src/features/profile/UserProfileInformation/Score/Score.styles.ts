import { styled } from "@/../stitches.config";

export const Container = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "$6",

  maxWidth: "545px",
  marginTop: "$4",

  "@mobile": {
    gridTemplateColumns: "1fr",
    gap: "$2",
  },
});

export const StatisticCard = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$2",

  background: "$neutral100",
  border: "2px solid $neutral200",
  borderRadius: "12px",

  padding: "$2",
});

export const StatisticInformation = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});
