export const truncateText = (
  text: string,
  maxLength: number
): string => {
  if (!text || typeof text !== "string") return "---";
  return text.length <= maxLength
    ? text
    : text.slice(0, maxLength) + "...";
};
export const formatSeconds = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const h =
    hours > 0 ? `${hours} Hour${hours > 1 ? "s" : ""}` : "";
  const m =
    minutes > 0
      ? `${minutes} Minute${minutes > 1 ? "s" : ""}`
      : "";

  return (
    [h, m].filter(Boolean).join(", ") ||
    "Less than 1 minute"
  );
};
