export function removeEmptyLines(text: string): string {
  return text
    .split("\n")
    .filter((line) => line.trim() !== "")
    .join("\n");
}
