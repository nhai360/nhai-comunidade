import { styled } from "@/../stitches.config";

export const Tag = styled("span", {
  padding: "2px $1",
  borderRadius: "$xsmall",

  fontWeight: 600,
  fontSize: "$caption",
  lineHeight: "$caption",
  textAlign: "center",

  variants: {
    variant: {
      pink: {
        color: "$pinkMedium",
        background: "$pinkLight",
      },
      yellow: {
        color: "$yellowMedium",
        background: "$yellowLight",
      },
      green: {
        color: "$greenMedium",
        background: "$greenLight",
      },
      blue: {
        color: "$blueMedium",
        background: "$blueLight",
      },
    },
  },

  defaultVariants: {
    variant: "pink",
  },
});
