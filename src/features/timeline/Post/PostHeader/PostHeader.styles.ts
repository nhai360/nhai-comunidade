import { styled } from "@/../stitches.config";
import { Typography } from "@/ui";

export const Container = styled("header", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "$6",
});

export const User = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$4",
});

export const Info = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const FullName = styled(Typography.Text, {
  display: "flex",
  alignItems: "center",
  gap: "$4",
});

export const Actions = styled("div", {
  display: "flex",
  gap: "$2",
});
