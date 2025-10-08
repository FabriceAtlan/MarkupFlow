import { Editor as TipTapEditor } from "@tiptap/react";
import { DOMSerializer } from "prosemirror-model";

export function copieEditorContent(
  editor: TipTapEditor,
  format: "text" | "html"
) {
  if (!editor) return;
  if (format === "text") {
    navigator.clipboard.writeText(editor.getText().trim());
  } else if (format === "html") {
    let html = editor.getHTML().trim();
    html = html.replace(/<p>(\s|&nbsp;)*<\/p>$/, "");
    navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([html], {
          type: "text/plain",
        }),
      }),
    ]);
  }
}

export async function copieCurrentLine(
  editor: TipTapEditor,
  format: "text" | "html"
) {
  if (!editor) return null;

  const { from } = editor.state.selection;
  const $pos = editor.state.doc.resolve(from);
  const node = $pos.parent;

  if (!node || !node.textContent.trim()) return;

  try {
    if (format === "text") {
      await navigator.clipboard.writeText(node.textContent.trim());
    } else {
      const serializer = DOMSerializer.fromSchema(editor.state.schema);
      const dom = serializer.serializeNode(node);

      const container = document.createElement("div");
      container.appendChild(dom);
      let html = container.innerHTML.trim();

      // Facultatif : ajoute un wrapper pour la compatibilité clipboard
      html = `<div>${html}</div>`;

      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([node.textContent], { type: "text/plain" }),
        }),
      ]);
    }
  } catch (err) {
    console.error("Échec presse-papier :", err);
  }
}
