const capitalizeStr = (str) => {
  if (!str) return "";

  const strArr = str.split(" ");
  const capitalized = strArr.map(
    (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  );
  return capitalized.join(" ");
};

export { capitalizeStr };
