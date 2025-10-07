import React from "react";
import { EditorContent } from "@tiptap/react";
import { useEditorContext } from "../../hooks/useEditorContext";
import { cleanText } from "../../utils/cleanText";
// import "../../styles/EditorNew.css";

export const Editor: React.FC = () => {
  const editor = useEditorContext();

  if (!editor) return null;

  // Intercepter le collage via ProseMirror
  editor.setOptions({
    editorProps: {
      handlePaste(_, event) {
        event.preventDefault();

        const pasted = event.clipboardData?.getData("text/plain") || "";
        const cleaned = cleanText(pasted);

        // Transformer en tableau de paragraphes pour Tiptap
        const lines = cleaned.split(/\n/).map((line) => ({
          type: "paragraph",
          content: line.trim() !== "" ? [{ type: "text", text: line }] : [],
        }));

        // Insertion dans l’éditeur
        editor.commands.insertContent(lines);

        return true;
      },
    },
  });

  return <EditorContent editor={editor} className="tiptap-container" />;
};
