export const toSentenceCase = (str, exceptions = []) => {
  if (!str || typeof str !== "string") return "";

  let formatted = str.trim().toLowerCase();

  formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);

  exceptions.forEach((ex) => {
    const regex = new RegExp(`\\b${ex.toLowerCase()}\\b`, "gi");
    formatted = formatted.replace(regex, ex);
  });

  return formatted;
};