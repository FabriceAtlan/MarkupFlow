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
    const text = node.textContent.trim();

    if (format === "text") {
      await navigator.clipboard.writeText(text);
    } else {
      const serializer = DOMSerializer.fromSchema(editor.state.schema);
      const domNode = serializer.serializeNode(node);

      const tempContainer = document.createElement("template");
      tempContainer.content.append(...Array.from(domNode.childNodes));
      const html = tempContainer.innerHTML;

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
