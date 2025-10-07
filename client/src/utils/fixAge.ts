const units = [
  "an",
  "ans",
  "kg",
  "m",
  "cm",
  "°C",
  "%",
  "Mo",
  // ajouter d'autres unités si besoin
];

export function addNonBreakingSpaceBeforeUnit(text: string): string {
  // on échappe les caractères spéciaux pour la regex
  const escapedUnits = units
    .map((u) => u.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(`(\\d+)\\s*(${escapedUnits})(?![a-zA-Z])`, "g");
  return text.replace(regex, "$1\u00A0$2");
}
