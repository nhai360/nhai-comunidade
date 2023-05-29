import { Button } from "@/ui";

import { styled } from "@/../stitches.config";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  paddingBlock: "$12",
  border: "2px dashed $blueLight",
  borderRadius: "$medium",

  transition: "all 0.2s",
  cursor: "pointer",

  height: "161px",
  width: "306px",

  "&:not(:disabled):hover": {
    borderColor: "$blueMedium",
  },

  variants: {
    isDragAccept: {
      true: {
        borderColor: "$greenMedium",
      },
    },
    isDragReject: {
      true: {
        borderColor: "$pinkMedium",
      },
    },
    isFocused: {
      true: {
        borderColor: "$blueMedium",
      },
    },
  },
});

export const Preview = styled("div", {
  display: "flex",
  gap: "$3",
});

export const ThumbnailImage = styled("img", {
  objectFit: "cover",
  height: "161px",
  width: "306px",
  borderRadius: "$medium",
});

export const PreviewRemoveButton = styled(Button, {});
