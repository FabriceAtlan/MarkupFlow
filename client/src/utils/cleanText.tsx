import { addNonBreakingSpaceBeforeUnit } from "./fixAge";
import { removeEmptyLines } from "./removeEmptyLine";
import { modifySpecialWord } from "./fixWord";
import { InputRule } from "@tiptap/core";
import { EditorState, Transaction } from "prosemirror-state";

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
const flag = "#";

function normalizeWordChars(text: string) {
  return text.replace(/[–—]/g, "-");
}

function escapeRegexChar(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const replaceFlag = new InputRule({
  find: /#(\w+)/g,
  handler: ({
    state,
    range,
    match,
  }: {
    state: EditorState;
    range: { from: number; to: number };
    match: RegExpMatchArray;
  }): void => {
    const { tr } = state;
    const word = match[1];

    tr.insertText("\u00A0" + word, range.from, range.to);
  },
});

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

  // Remplacer le flag # par NBSP
  // const regFlag = new RegExp(`${flag}\\s*`, "g");
  // cleaned = cleaned.replace(regFlag, "\u00A0");

  cleaned = cleaned.replace(/#([^\s]+)/g, "\u00A0$1");

  // Correction de l'âge
  cleaned = addNonBreakingSpaceBeforeUnit(cleaned);

  return cleaned;
}
