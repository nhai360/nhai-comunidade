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
  position: "relative",
  minHeight: "100px",
  borderRadius: "$medium",
});

export const ThumbnailImage = styled("img", {
  objectFit: "cover",
  maxWidth: "400px",
  maxHeight: "300px",
  borderRadius: "$medium",
});

export const PreviewRemoveButton = styled(Button, {
  position: "absolute",
  right: 10,
  top: 10,
  zIndex: "$middle",
});
