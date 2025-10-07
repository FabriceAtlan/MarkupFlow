import StarterKit from "@tiptap/starter-kit";
import type { Extension } from "@tiptap/core";
import { shortCut } from "../utils/keyboardManager";

export const defaultExtensions: Extension[] = [
	StarterKit.configure({
		heading: {levels: [1, 2, 3, 4]},
	}),
	shortCut,
]