import { addNonBreakingSpaceBeforeUnit } from "./fixAge";
import { removeEmptyLines } from "./removeEmptyLine";
import { modifySpecialWord } from "./fixWord";

const unwantedWords = [
  "H1 - ",
  "H2 - ",
  "H3 - ",
  "H4 - ",
  "H2 ",
  "H3 ",
  "H4 ",
  "(accordéon)",
  "Chapô :",
];

const listChars = [":", ";", "!", "?", "»"];
const listChars1 = ["«"];

function normalizeWordChars(text: string) {
  return text.replace(/[–—]/g, "-"); // remplace EN DASH et EM DASH par "-"
}

function escapeRegexChar(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Nettoyage du texte brut
export function cleanText(text: string): string {
  let cleaned = text;

  cleaned = normalizeWordChars(cleaned);

  // suppression des mots de la liste unwantedWords
  const unwantedRegex = new RegExp(
    unwantedWords.map(escapeRegexChar).join("|"),
    "g"
  );
  cleaned = cleaned.replace(unwantedRegex, "");
  cleaned = removeEmptyLines(cleaned);
  cleaned = modifySpecialWord(cleaned);

  // normalisation des retours à la ligne
  cleaned = cleaned.replace(/\r\n|\r/g, "\n");

  // ajout d'espaces insécables avant certains caractères
  const escapedChars = listChars.map((c) => `\\${c}`).join("|");
  const regex = new RegExp(`([^\\u00A0\\n])\\s*(${escapedChars})`, "g");
  cleaned = cleaned.replace(regex, "$1\u00A0$2");

  // ajout d'espaces insécables après certains caractères
  const escapedChars1 = listChars1.map((c) => `\\${c}`).join("|");
  const regex1 = new RegExp(`(${escapedChars1})\\s*([^\\u00A0\\n])`, "g");
  cleaned = cleaned.replace(regex1, "$1\u00A0$2");

  // Correction de l'âge
  cleaned = addNonBreakingSpaceBeforeUnit(cleaned);

  return cleaned;
}
