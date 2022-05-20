export const formatIngr = (ingredient) => {
  const { unit, fraction, measurement, name } = ingredient;

  const fractionCharacter = {
    "1/8": "⅛",
    "1/4": "¼",
    "1/3": "⅓",
    "1/2": "½",
    "2/3": "⅔",
    "3/4": "¾",
  };

  const unitStr = unit ? unit + " " : "";
  const measStr = measurement + (measurement && parseInt(unit) > 1 ? "s" : "");
  const fracStr = fraction ? fractionCharacter[fraction] + " " : "";

  return unitStr + fracStr + measStr + " " + name;
};

export const capitalizeStr = (str) => {
  if (!str) return "";

  const strArr = str.split(" ");
  const capitalized = strArr.map(
    (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  );
  return capitalized.join(" ");
};
