export const fancyDisplayedName = (name: string) => {
  return name
    .split(" ")
    .map((word) => {
      return word[0];
    })
    .join("");
};
