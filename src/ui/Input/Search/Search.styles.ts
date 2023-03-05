import { styled } from "@/../stitches.config";

export const Container = styled("div", {
  background: "$neutral200",
  borderRadius: "$medium",
  border: "2px solid transparent",
  boxShadow: "$xs",

  display: "flex",
  alignItems: "center",

  input: {
    background: "transparent",
    border: 0,

    fontWeight: 700,
    fontSize: "$body2",
    lineHeight: "150%",
    color: "$textPrimary",

    "&:disabled": {
      cursor: "not-allowed",
    },

    "&::placeholder": {
      color: "$textAuxiliary",
      transition: "all 0.2s",
    },

    "&:not(:disabled)": {
      "&:hover::placeholder": {
        color: "$textPrimary",
      },

      "&:focus": {
        borderColor: "$blueMedium",

        "&::placeholder": {
          color: "$textPrimary",
        },
      },
    },
  },

  button: {
    background: "transparent",
    marginRight: "$3",
    color: "$textTitle",
    border: 0,
    transition: "all 0.2s",

    "&:disabled": {
      cursor: "not-allowed",
      color: "$textAuxiliary",
    },

    "&:not(:disabled):hover": {
      opacity: 0.7,
    },
  },

  variants: {
    size: {
      large: {
        input: {
          padding: "$4",
        },
      },
      medium: {
        input: {
          padding: "$3 $4",
        },
      },
    },
  },

  defaultVariants: {
    size: "medium",
  },
});
