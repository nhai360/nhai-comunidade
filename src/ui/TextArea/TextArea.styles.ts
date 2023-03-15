import { styled, css } from "@/../stitches.config";

export const Container = styled("div", {
  borderRadius: "$medium",
  border: "2px solid transparent",

  fontWeight: 700,
  fontSize: "$body2",
  fontFamily: "$body",
  lineHeight: "150%",

  display: "flex",
  alignItems: "center",

  width: "100%",
  transition: "al 0.2s",

  cursor: "text",

  ".DraftEditor-root": {
    width: "100%",
    height: "100%",
  },

  ".public-DraftEditor-content": {
    maxHeight: "500px",
    overflowY: "auto",
  },

  variants: {
    color: {
      neutral: {
        background: "$neutral200",
        boxShadow: "$xs",

        ".public-DraftEditorPlaceholder-root": {
          position: "absolute",
          color: "$textAuxiliary",
          transition: "all 0.2s",
        },

        ".public-DraftEditorPlaceholder-hasFocus": {
          color: "$textPrimary",
        },

        "&:not(:disabled):hover .public-DraftEditorPlaceholder-root": {
          color: "$textPrimary",
        },
      },
      green: {
        background: "$greenLight",
        color: "$textPrimary",

        ".public-DraftEditorPlaceholder-root": {
          color: "$textPrimary",
        },
      },
      pink: {
        background: "$pinkLight",
        color: "$textPrimary",

        ".public-DraftEditorPlaceholder-root": {
          color: "$textPrimary",
        },
      },
      blue: {
        background: "$blueLight",
        color: "$textPrimary",

        ".public-DraftEditorPlaceholder-root": {
          color: "$textPrimary",
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
    focus: {
      true: {
        borderColor: "$blueMedium",
      },
    },
  },

  compoundVariants: [
    {
      color: "green",
      focus: true,
      css: {
        borderColor: "$greenMedium",
      },
    },
    {
      color: "pink",
      focus: true,
      css: {
        borderColor: "$pinkMedium",
      },
    },
  ],

  defaultVariants: {
    size: "medium",
    color: "neutral",
  },
});

export const TextBlueStyles = css({ color: "$blueMedium" }).toString();
