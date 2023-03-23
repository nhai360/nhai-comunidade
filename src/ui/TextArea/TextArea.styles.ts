import { styled, css } from "@/../stitches.config";
import { PostColorDecoder } from "@/client/posts";

export const Container = styled("div", {
  borderRadius: "$medium",
  border: "2px solid transparent",

  maxWidth: "100%",

  fontWeight: 700,
  fontSize: "$body2",
  fontFamily: "$body",
  lineHeight: "150%",

  display: "flex",
  alignItems: "flex-start",

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
      [PostColorDecoder.Values.GREEN]: {
        background: "$greenLight",
        color: "$textPrimary",

        ".public-DraftEditorPlaceholder-root": {
          color: "$textPrimary",
        },
      },
      [PostColorDecoder.Values.PINK]: {
        background: "$pinkLight",
        color: "$textPrimary",

        ".public-DraftEditorPlaceholder-root": {
          color: "$textPrimary",
        },
      },
      [PostColorDecoder.Values.BLUE]: {
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

export const EmojiStyles = css({
  position: "relative",
}).toString();

export const EmojiSuggestionsEntryStyles = css({
  display: "flex",
  alignItems: "center",

  padding: "$2 $4",
}).toString();

export const EmojiSuggestionsEntryFocusedStyles = css({
  background: "$pinkLight",

  display: "flex",
  alignItems: "center",

  padding: "$2 $4",
}).toString();

export const EmojiSelectButtonStyles = css({
  background: "transparent",
  border: 0,

  fontSize: "32px",
  color: "$textPrimary",
  transition: "all 0.2s",

  "&:hover": {
    opacity: 0.8,
  },
}).toString();

export const EmojiSelectPopoverEntryStyles = css({
  background: "transparent",
  border: 0,

  height: "32px",
  width: "32px",

  borderRadius: "$small",

  display: "grid",
  placeItems: "center",

  fontSize: "16px",
  transition: "all 0.2s",

  "&:hover": {
    background: "$neutral200",
  },
}).toString();

export const EmojiSelectPopoverOnTopStyles = css({
  background: "$neutral100",
  borderRadius: "$medium",
  border: "1px solid $neutral200",

  position: "absolute",
  zIndex: 99,

  bottom: "100%",
  right: "0",
}).toString();

export const EmojiSelectPopoverOnBottomStyles = css({
  background: "$neutral100",
  borderRadius: "$medium",
  border: "1px solid $neutral200",

  position: "absolute",
  zIndex: 99,

  top: "100%",
  right: "0",
}).toString();

export const EmojiSelectPopoverNavEntryStyles = css({
  background: "$neutral200",
  border: 0,

  height: "32px",
  width: "32px",

  borderRadius: "$small",

  display: "grid",
  placeItems: "center",

  fontSize: "16px",
  color: "$textSecondary",
  transition: "all 0.2s",

  "&:hover": {
    color: "$pinkMedium",
  },
}).toString();

export const EmojiSelectPopoverNavEntryActiveStyles = css({
  background: "$pinkLight",
  border: 0,

  height: "32px",
  width: "32px",

  borderRadius: "$small",

  display: "grid",
  placeItems: "center",

  fontSize: "16px",
  color: "$pinkMedium",
}).toString();

export const EmojiSelectPopoverNavStyles = css({
  display: "flex",
  width: "100%",
  padding: "$3",
  gap: "$2",
}).toString();

export const EmojiSelectPopoverGroupsStyles = css({
  height: "150px",
  width: "100%",
}).toString();
