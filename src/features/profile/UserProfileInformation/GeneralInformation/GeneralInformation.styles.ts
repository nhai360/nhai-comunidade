import { Typography } from "@/ui";

import { styled } from "@/../stitches.config";

export const Container = styled("div", {
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
