import { styled } from "@/../stitches.config";

export const Container = styled("ul", {
  display: "flex",
  gap: "$6",

  overflowX: "auto",
  padding: "10px",
  margin: "-10px",

  "&::-webkit-scrollbar": {
    width: 0,
    height: 0,
    display: "none",
  },

  scrollbarWidth: "none",
});

export const SuggestionItem = styled("li", {
  position: "relative",
  borderRadius: "$large",

  minWidth: "179px",
  height: "240px",

  display: "flex",
  flexDirection: "column",

  padding: "$5",

  img: {
    position: "absolute",
  },

  strong: {
    lineHeight: "29px",
  },

  variants: {
    type: {
      book: {
        background: "$pinkMedium",

        img: {
          top: "-9px",
          left: "-9px",
        },

        strong: {
          color: "#151086",
          fontSize: "32px",
          marginTop: "auto",
        },
      },
      camera: {
        background: "$yellowMedium",

        img: {
          bottom: "-10px",
          left: "-10px",
        },

        strong: {
          color: "#3B26AB",
          fontSize: "30px",
          marginBottom: "auto",
        },
      },
      coin: {
        background: "$greenMedium",
        padding: "$3 $5",

        img: {
          bottom: "-14px",
          left: "-78px",
        },

        strong: {
          color: "#13260A",
          fontSize: "30px",
          marginBottom: "auto",
          textAlign: "right",
        },
      },
    },
  },
});
