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
  maxHeight: "720px",

  cursor: "pointer",

  [`&:hover ${ControlsContainer}`]: {
    opacity: 1,
  },

  ".mux-video": {
    width: "100%",
    maxHeight: "500px",
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

export const VolumeContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$3",

  input: {
    "-webkit-appearance": "none",

    width: "80px",
    height: "4px",

    background: "$neutral400",
    borderRadius: "$xsmall",
  },

  "input::-webkit-slider-thumb": {
    "-webkit-appearance": "none",

    background: "$pinkMedium",

    height: "12px",
    width: "12px",

    borderRadius: "50%",
    cursor: "ew-resize",
  },

  "input::-moz-range-thumb": {
    "-webkit-appearance": "none",

    background: "$pinkMedium",

    height: "12px",
    width: "12px",

    borderRadius: "50%",
    cursor: "ew-resize",
  },

  "input::-ms-thumb": {
    "-webkit-appearance": "none",

    background: "$pinkMedium",

    height: "12px",
    width: "12px",

    borderRadius: "50%",
    cursor: "ew-resize",
  },
});
