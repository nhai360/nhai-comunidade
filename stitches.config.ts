import { createStitches } from "@stitches/react";

export const { styled, getCssText, globalCss, keyframes, theme } =
  createStitches({
    theme: {
      fonts: {
        heading: "Red Hat Display",
        subHeadline: "Red Hat Display",
        body: "Outfit",
        caption: "Outfit",
        nano: "Red Hat Display",
      },
      fontSizes: {
        h1: "48px",
        h2: "40px",
        h3: "24px",
        h4: "20px",
        body1: "18px",
        body2: "16px",
        body3: "14px",
        caption: "12px",
        nano: "10px",
      },
      lineHeights: {
        h1: "150%",
        h2: "125%",
        h3: "150%",
        h4: "125%",
        subHeadline: "24px",
        body: "150%",
        caption: "150%",
        nano: "125%",
      },
      colors: {
        textTitle: "#212121",
        textPrimary: "#454545",
        textSecondary: "#8c8c8c",
        textAuxiliary: "#b1b1b1",

        neutral100: "#ffffff",
        neutral200: "#efefef",
        neutral300: "#e7e7e7",
        neutral400: "#dadada",
        neutral500: "#cccccc",
        neutral600: "#656565",
        neutral700: "#505050",
        neutral800: "#212121",

        greenDark: "#56b829",
        greenMedium: "#63d130",
        greenLight: "#e9f8e2",

        pinkMedium: "#f23d80",
        pinkLight: "#fde3ed",

        yellowDark: "#d6a700",
        yellowMedium: "#ffc700",
        yellowLight: "#fff7db",

        blueDark: "#0081cc",
        blueMedium: "#01a1ff",
        blueLight: "#bfe7ff",

        background: "#f8f1f4",
      },
      space: {
        px: "1px",
        0.5: "0.125rem",
        1: "0.25rem",
        1.5: "0.375rem",
        2: "0.5rem",
        2.5: "0.625rem",
        3: "0.75rem",
        3.5: "0.875rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        12: "3rem",
        14: "3.5rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
        52: "13rem",
        56: "14rem",
        60: "15rem",
        64: "16rem",
        72: "18rem",
        80: "20rem",
        96: "24rem",
      },
      radii: {
        large: "32px",
        medium: "16px",
        small: "6px",
        xsmall: "4px",
      },
      shadows: {
        xs: "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 5px 4px -4px rgba(0, 0, 0, 0.02);",
      },
    },
  });

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    outline: 0,
    boxSizing: "border-box",
  },

  body: {
    background: "$background",
    color: "$textPrimary",
    fontFamily: "$body",
    fontSize: "$body2",
  },

  button: {
    cursor: "pointer",
  },

  ul: {
    listStyle: "none",
  },
});
