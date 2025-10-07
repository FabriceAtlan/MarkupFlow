import React, { useEffect, useState } from "react";
import { useEditorContext } from "../../context/EditorContext";
import { BubbleMenu } from "@tiptap/react/menus";
import { copieCurrentLine } from "../../utils/copieEditorContent";

export const Toolbar: React.FC = () => {
  const editor = useEditorContext();
  const [currentBlock, setCurrentBlock] = useState("0");

  useEffect(() => {
    if (!editor) return;

    const updateBlockType = () => {
      const node = editor.state.selection.$from.parent;
      if (node.type.name === "heading")
        setCurrentBlock(String(node.attrs.level));
      else setCurrentBlock("0");
    };

    editor.on("selectionUpdate", updateBlockType);
    editor.on("transaction", updateBlockType);

    return () => {
      editor.off("selectionUpdate", updateBlockType);
      editor.off("transaction", updateBlockType);
    };
  }, [editor]);

  if (!editor) return null;

  const handleHeadingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = Number(e.target.value);
    editor.chain().focus();
    if (level === 0) editor.chain().setNode("paragraph").run();
    else editor.chain().setNode("heading", { level }).run();
  };

  return (
    <BubbleMenu editor={editor} className="bubble-menu-wrapper">
      {/* Bouton copier*/}
      <img
        onClick={() => copieCurrentLine(editor, "html")}
        className="bubble-menu-picto"
        src="picto-copy.png"
        alt=""
      />

      {/* Select pour Heading / Paragraphe */}
      <select value={currentBlock} onChange={handleHeadingChange}>
        <option value="0">Paragraphe</option>
        <option value="1">H1</option>
        <option value="2">H2</option>
        <option value="3">H3</option>
        <option value="4">H4</option>
      </select>

      {/* Bouton bullet list */}
      <img
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="bubble-menu-picto"
        src="picto-bullet.png"
        alt=""
      />

      {/* Bouton Gras */}
      <img
        onClick={() => editor.chain().focus().toggleBold().run()}
        className="bubble-menu-picto"
        src="picto-bold.png"
        alt=""
      />

      {/* Bouton Italique */}
      <img
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className="bubble-menu-picto"
        src="picto-italic.png"
        alt=""
      />
    </BubbleMenu>
  );
};
