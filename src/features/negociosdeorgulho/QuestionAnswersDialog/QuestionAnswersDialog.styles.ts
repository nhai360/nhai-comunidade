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
  height: 180,
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
});

export const QuestionHeaderSubtitle = styled("p", {
  color: "$neutral300",
  fontSize: "$body1",
  marginTop: "$2",
});

export const QuestionHeaderImage = styled("img", {
  width: 200,
  height: 180,
  backgroundColor: "$neutral100",
});

export const QuestionOptionContainer = styled("div", {
  margin: "$4 0",
});

export const QuestionOptionTitle = styled("p", {});

export const NumberPickerContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "$3",
  overflow: "hidden",
});

export const NumberPickerLine = styled("div", {
  backgroundColor: "#EE0014",
  display: "flex",
  width: "100%",
  height: 2,
});

export const NumberPickerOptionContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 40,
  height: 40,
  cursor: "pointer",
  borderRadius: 4,
  backgroundColor: "$neutral200",
});

export const NumberPickerOptionTitle = styled("p", {
  color: "#fff",
});
