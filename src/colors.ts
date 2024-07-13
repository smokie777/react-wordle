export const colors = {
  white: "white",
  lightGray: "lightgrey",
  darkGray: "grey",
  yellow: "gold",
  green: "forestgreen",
  black: "black",
};

export const genLetterColorStyles = (backgroundColor: string) => ({
  background: backgroundColor,
  color:
    backgroundColor === colors.lightGray || backgroundColor === colors.white
      ? colors.black
      : colors.white,
});
