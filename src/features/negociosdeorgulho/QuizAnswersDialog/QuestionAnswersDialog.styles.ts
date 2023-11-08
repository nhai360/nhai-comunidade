import { styled } from "@/../stitches.config";

export const FormContainer = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "$4",
});

export const QuestionHeader = styled("div", {
  display: "flex",
  backgroundColor: "#EE0014",
  flex: 1,
  minHeight: 120,

  "@media (max-width: 640px)": {
    fontSize: "$h4",
  },
});

export const QuestionHeaderTitleContainer = styled("div", {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "$1 $8",
});

export const QuestionHeaderTitle = styled("h3", {
  color: "$neutral100",
  fontSize: "$h3",
  fontFamily: "RingBold",

  "@media (max-width: 640px)": {
    fontSize: "$h4",
  },
});

export const QuestionHeaderSubtitle = styled("p", {
  color: "$neutral300",
  fontSize: "$body1",
  marginTop: "$2",
  fontFamily: "RingMedium",

  "@media (max-width: 640px)": {
    fontSize: "$body3",
  },
});

export const QuestionHeaderImage = styled("img", {
  width: 220,
  height: 160,
  backgroundColor: "$neutral100",
  objectFit: "cover",

  "@media (max-width: 640px)": {
    display: "none",
  },
});

export const QuestionOptionContainer = styled("div", {});

export const QuestionOptionTitle = styled("p", {
  fontWeight: 700,
  fontFamily: "RingBold",
});

export const NumberPickerContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "$4",
  overflowX: "hidden",
  position: "relative",
});

export const NumberPickerLine = styled("div", {
  backgroundColor: "#EE0014",
  display: "flex",
  height: 2,
  left: "$1",
  right: "$1",
  position: "absolute",
});

export const NumberPickerOptionContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 24,
  height: 24,
  cursor: "pointer",
  borderRadius: 100,
  backgroundColor: "$neutral200",
  borderColor: "#EE0014",
  borderWidth: 3,
  borderStyle: "solid",
  zIndex: 99,
});

export const NumberPickerOptionTitle = styled("p", {
  color: "#fff",
  fontSize: 14,
  fontFamily: "RingBold",
});
