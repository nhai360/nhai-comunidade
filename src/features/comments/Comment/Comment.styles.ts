import { styled } from "@/../stitches.config";

export const Wrapper = styled("li", {
  display: "flex",
  alignItems: "flex-start",
  gap: "$3",
  width: "100%",
});

export const Container = styled("div", {
  width: "100%",
});

export const Header = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const Content = styled("div", {
  padding: "$4",
  background: "$pinkLight",
  borderRadius: "$medium",
  marginTop: "$2",

  display: "flex",
  flexDirection: "column",
  gap: "$6",

  variants: {
    color: {
      green: {
        background: "$greenLight",
      },
      pink: {
        background: "$pinkLight",
      },
      yellow: {
        background: "$yellowLight",
        width: "50%",
      },
    },
  },
});

export const RepliesList = styled("ul", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "$8",
});

export const SeeMoreButton = styled("button", {
  all: "unset",
  cursor: "pointer",
});
