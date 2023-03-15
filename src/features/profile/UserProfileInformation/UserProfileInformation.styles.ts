import { styled } from "@/../stitches.config";
import { Typography } from "@/ui";

export const Container = styled("section", {
  marginLeft: "$28",
  transform: "translateY(-64px)",
});

export const GeneralInformation = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: "$6",
});

export const InformationField = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$2",
});

export const Description = styled(Typography.Text, {
  maxWidth: "416px",
});

export const Statistics = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "$6",

  maxWidth: "545px",
  marginTop: "$4",
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
