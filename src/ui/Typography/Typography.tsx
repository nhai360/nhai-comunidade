import NextLink from "next/link";

import { styled } from "@/../stitches.config";

const BaseText = styled("span", {
  variants: {
    color: {
      title: {
        color: "$textTitle",
      },
      primary: {
        color: "$textPrimary",
      },
      secondary: {
        color: "$textSecondary",
      },
      auxiliary: {
        color: "$textAuxiliary",
      },
      neutral: {
        color: "$neutral100",
      },
      pink: {
        color: "$pinkMedium",
      },
      blue: {
        color: "$blueMedium",
      },
    },

    align: {
      center: {
        textAlign: "center",
      },
      left: {
        textAlign: "left",
      },
      right: {
        textAlign: "right",
      },
    },
  },
});

const Text = styled(BaseText, {
  variants: {
    size: {
      body1: {
        fontFamily: "$body",
        fontSize: "$body1",
        lineHeight: "$body",
      },
      body2: {
        fontFamily: "$body",
        fontSize: "$body2",
        lineHeight: "$body",
      },
      body3: {
        fontFamily: "$body",
        fontSize: "$body3",
        lineHeight: "$body",
      },
      caption: {
        fontFamily: "$caption",
        fontSize: "$caption",
        lineHeight: "$caption",
      },
      nano: {
        fontFamily: "$nano",
        fontSize: "$nano",
        lineHeight: "$nano",
      },
    },
    weight: {
      bold: {
        fontWeight: 700,
      },
      medium: {
        fontWeight: 500,
      },
      regular: {
        fontWeight: 400,
      },
    },
  },
});

const Title = styled(BaseText, {
  variants: {
    size: {
      h1: {
        fontFamily: "$heading",
        fontSize: "$h1",
        lineHeight: "$h1",
      },
      h2: {
        fontFamily: "$heading",
        fontSize: "$h2",
        lineHeight: "$h2",
      },
      h3: {
        fontFamily: "$heading",
        fontSize: "$h3",
        lineHeight: "$h3",
      },
    },
    weight: {
      black: {
        fontWeight: 900,
      },
      bold: {
        fontWeight: 700,
      },
      medium: {
        fontWeight: 500,
      },
    },
  },
});

const Link = styled(NextLink, {
  color: "$blueDark",
  fontWeight: 700,
  fontSize: "$body2",
  lineHeight: "150%",
  textDecoration: "none",
  transition: "all 0.2s",

  display: "flex",
  alignItems: "center",
  gap: "$2",

  "&:hover": {
    opacity: 0.8,
  },
});

export const Typography = {
  Text,
  Title,
  Link,
};
