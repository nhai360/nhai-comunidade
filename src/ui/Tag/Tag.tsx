import { styled } from "@/../stitches.config";

export const Tag = styled("span", {
  padding: "$1 $2",
  borderRadius: "$xsmall",

  fontWeight: 500,
  fontSize: "$nano",
  lineHeight: "$nano",
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
