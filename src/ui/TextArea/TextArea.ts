import { styled } from "@/../stitches.config";

export const TextArea = styled("textarea", {
  borderRadius: "$medium",
  border: "2px solid transparent",

  fontWeight: 700,
  fontSize: "$body2",
  fontFamily: "$body",
  lineHeight: "150%",

  display: "flex",
  alignItems: "center",

  flex: 1,
  resize: "none",

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
        background: "$greenMedium",
        color: "$neutral100",

        "&::placeholder": {
          color: "$neutral100",
        },
      },
      pink: {
        background: "$pinkMedium",
        color: "$neutral100",

        "&::placeholder": {
          color: "$neutral100",
        },
      },
      blue: {
        background: "$blueMedium",
        color: "$neutral100",

        "&::placeholder": {
          color: "$neutral100",
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
