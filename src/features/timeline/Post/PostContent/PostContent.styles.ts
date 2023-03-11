import { styled } from "@/../stitches.config";

export const DefaultContainer = styled("article", {
  display: "flex",
  flexDirection: "column",
  gap: "$4",
  paddingBlock: "$4",
});

export const ColoredContainer = styled("article", {
  display: "flex",
  flexDirection: "column",

  marginBlock: "$4 $10",
  padding: "$8",
  borderRadius: "$large",
  gap: "$4",

  ".public-DraftEditor-content": {
    fontSize: "$h3",
    lineHeight: "$h3",
  },

  variants: {
    color: {
      green: {
        background: "$greenLight",
      },
      pink: {
        background: "$pinkLight",
      },
      blue: {
        background: "$blueLight",
      },
    },
  },
});

export const Image = styled("img", {
  objectFit: "cover",
  maxHeight: "400px",
  borderRadius: "$large",
});
