import { styled } from "@/../stitches.config";
import { PostColorDecoder } from "@/client/posts";

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
      [PostColorDecoder.Values.GREEN]: {
        background: "$greenLight",
      },
      [PostColorDecoder.Values.PINK]: {
        background: "$pinkLight",
      },
      [PostColorDecoder.Values.BLUE]: {
        background: "$blueLight",
      },
    },
  },
});

export const Image = styled("img", {
  objectFit: "cover",
  maxHeight: "400px",
  borderRadius: "$large",

  "@tablet": {
    maxHeight: "245px",
  },
});
