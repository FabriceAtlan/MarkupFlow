import StarterKit from "@tiptap/starter-kit";
import type { Extension } from "@tiptap/core";
import { shortCut } from "../utils/keyboardManager";
import Link from "@tiptap/extension-link";

export const defaultExtensions: (Extension<any, any> | ReturnType<typeof Link.configure>)[] = [
	StarterKit.configure({
		heading: {levels: [1, 2, 3, 4]},
	}),
	Link.configure({
		openOnClick: true,
	}),
	shortCut,
]