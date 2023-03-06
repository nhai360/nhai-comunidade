import { styled } from "@/../stitches.config";

export const Input = styled("input", {
  borderRadius: "$medium",
  border: "2px solid transparent",

  fontWeight: 700,
  fontSize: "$body2",
  lineHeight: "150%",

  display: "flex",
  alignItems: "center",

  width: "100%",
  transition: "al 0.2s",

  variants: {
    error: {
      true: {
        borderColor: "$pinkMedium",
      },
    },

    color: {
      neutral: {
        background: "$neutral200",
        boxShadow: "$xs",

        color: "$textPrimary",

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
      green: {
        background: "$greenLight",
        color: "$textPrimary",

        "&::placeholder": {
          color: "$textPrimary",
        },

        "&:focus": {
          borderColor: "$greenMedium",
        },
      },
      pink: {
        background: "$pinkLight",
        color: "$textPrimary",

        "&::placeholder": {
          color: "$textPrimary",
        },

        "&:focus": {
          borderColor: "$pinkMedium",
        },
      },
      blue: {
        background: "$blueLight",
        color: "$textPrimary",

        "&::placeholder": {
          color: "$textPrimary",
        },

        "&:focus": {
          borderColor: "$blueMedium",
        },
      },
    },

    size: {
      large: {
        padding: "$4",
      },
      medium: {
        padding: "$3 $4",
      },
    },
  },

  defaultVariants: {
    size: "medium",
    color: "neutral",
  },
});
