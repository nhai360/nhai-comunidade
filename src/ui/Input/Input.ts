import { styled } from "@/../stitches.config";

export const Input = styled("input", {
  background: "$neutral200",
  borderRadius: "$medium",
  border: "2px solid transparent",
  boxShadow: "$xs",

  fontWeight: 700,
  fontSize: "$body2",
  lineHeight: "150%",
  color: "$textPrimary",

  display: "flex",
  alignItems: "center",

  padding: "$4",

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

  variants: {
    error: {
      true: {
        borderColor: "$pinkMedium",
      },
    },
  },
});
