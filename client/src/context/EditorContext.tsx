import { createContext, useContext } from "react";
import { useEditor, Editor as TipTapEditor } from "@tiptap/react";
import type { ReactNode } from "react";
import { defaultExtensions } from "../extensions/defaultExtensions";
import { onTransactionHandler } from "../extensions/onTransactionHandler";

type EditorContextType = TipTapEditor | null;

export const EditorContext = createContext<EditorContextType>(null);

export function useEditorContext(): TipTapEditor {
  const editor = useContext(EditorContext);
  if (!editor)
    throw new Error("useEditorContext must be within an EditorProvider");
  return editor;
}

interface EditorProviderProps {
  children: ReactNode;
  initialContent?: string;
}

export function EditorProvider({
  children,
  initialContent = "<p>Écris ici...</p>",
}: EditorProviderProps) {
  const editor = useEditor({
    extensions: defaultExtensions,
    content: initialContent,
    onTransaction: onTransactionHandler,
  });

  return (
    <EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
  );
}
