import { styled } from "@/../stitches.config";

export const Container = styled("div", {});

export const VideoScrollContainer = styled("div", {
  display: "flex",
  overflowX: "auto",
  gap: "$4",
  padding: "1rem 0 12px",
  marginBottom: "2rem",
});

export const VideosGridContainer = styled("div", {
  gap: "$4",
  margin: "16px 0 12px",
  display: "flex",
  flexWrap: "wrap",
});
