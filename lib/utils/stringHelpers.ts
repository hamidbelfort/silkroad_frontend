export const truncateText = (
  text: string | null | undefined,
  maxLength: number
): string => {
  if (!text || typeof text !== "string") return "---";
  if (text.length <= maxLength) return text;
  const resText = text.slice(0, maxLength) + "...";
  return resText;
};
export const formatSeconds = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const h = hours > 0 ? `${hours} Hour${hours > 1 ? "s" : ""}` : "";
  const m = minutes > 0 ? `${minutes} Minute${minutes > 1 ? "s" : ""}` : "";

  return [h, m].filter(Boolean).join(", ") || "Less than 1 minute";
};
