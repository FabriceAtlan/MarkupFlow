import { useContext } from "react";
import { EditorContext } from "../context/EditorContext"
import type { Editor as TipTapEditor } from "@tiptap/react";

export function useEditorContext(): TipTapEditor {
	const editor = useContext(EditorContext);
	if (!editor) throw new Error("useEditorContext must be used within EditorProvider");
	return editor;
}