import { styled } from "@/../stitches.config";

export const Button = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  columnGap: "$2",
  borderRadius: "$medium",
  border: 0,

  fontFamily: "$body",
  fontSize: "$body2",
  fontWeight: 700,
  lineHeight: "150%",
  letterSpacing: "0.04rem",

  transition: "all 0.2s",

  "&:disabled": {
    background: "$neutral500",
    color: "$textPrimary",
    cursor: "not-allowed",
  },

  variants: {
    icon: {
      true: {
        width: "48px",
        height: "48px",
        color: "$textTitle !important",
        padding: "0 !important",

        "&:focus-visible": {
          background: "$blueLight",
        },

        "&:not(:disabled):hover": {
          background: "$blueLight",
        },
      },
    },
    variant: {
      primary: {
        color: "$neutral100 !important",
        background: "$blueMedium",

        "&:not(:disabled):hover": {
          background: "$blueDark !important",
        },
      },
      outline: {
        background: "transparent",
        color: "$textPrimary",
        border: "2px solid $blueMedium",
      },
      transparent: {
        background: "transparent",
        color: "$blueDark",
      },
    },
    size: {
      large: {
        padding: "$4 $6",
      },
      medium: {
        padding: "$3 $4",
      },
      small: {
        padding: "$2 $3",
      },
    },
    fullWidth: {
      true: {
        width: "100%",
      },
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "large",
    fullWidth: false,
  },

  compoundVariants: [
    {
      icon: true,
      size: "small",
      css: {
        height: "40px",
        width: "40px",
      },
    },
  ],
});
