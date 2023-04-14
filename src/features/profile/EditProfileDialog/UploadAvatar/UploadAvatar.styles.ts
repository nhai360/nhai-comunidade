import { styled } from "@/../stitches.config";

export const Container = styled("div", {
  position: "relative",
  marginRight: "auto",
  cursor: "pointer",

  button: {
    position: "absolute",
    border: 0,

    background: "rgba(33, 33, 33, 0.64);",
    color: "$neutral100",

    borderRadius: "8px",
    height: "37px",
    width: "37px",

    left: "50%",
    top: "50%",

    transform: "translate(-50%, -50%)",
    transition: "all 0.5s",
  },
});
