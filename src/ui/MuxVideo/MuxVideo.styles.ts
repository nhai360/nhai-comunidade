import { styled } from "@/../stitches.config";

export const ControlsContainer = styled("div", {
  position: "absolute",
  padding: "$6",

  background: "rgba(50, 50, 50, 0.6)",
  backdropFilter: "blur(5px)",

  bottom: 0,
  left: 0,
  right: 0,

  borderBottomLeftRadius: "$large",
  borderBottomRightRadius: "$large",

  opacity: 0,
  transition: "all 0.2s",
});

export const Container = styled("div", {
  position: "relative",
  borderRadius: "$large",

  cursor: "pointer",

  [`&:hover ${ControlsContainer}`]: {
    opacity: 1,
  },

  ".mux-video": {
    width: "100%",
    borderRadius: "$large",
  },
});

export const Controls = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const ControlsRow = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$2",
  marginTop: "$3",
});
