import React, { useEffect, useState } from "react";
import { useEditorContext } from "../../context/EditorContext";
import { copieCurrentLine } from "../../utils/copieEditorContent";
import "../../styles/components/toolBar.scss";

export const Toolbar: React.FC = () => {
  const editor = useEditorContext();
  const [currentBlock, setCurrentBlock] = useState("0");
  const [url, setUrl] = useState("");

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

  const addLink = () => {
    if (!url) return null;
    const href =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setUrl("");
  };

  return (
    <div className="bubble-menu-wrapper">
      {/* Select pour Heading / Paragraphe */}
      <select
        className="bubble-select"
        value={currentBlock}
        onChange={handleHeadingChange}
      >
        <option value="0">Paragraphe</option>
        <option value="1">H1</option>
        <option value="2">H2</option>
        <option value="3">H3</option>
        <option value="4">H4</option>
      </select>

      <div className="div-btn-feat-wrapper">
        {/* Bouton copier*/}
        <img
          onClick={() => copieCurrentLine(editor, "html")}
          className="bubble-menu-picto"
          src="picto-copy.png"
          alt=""
        />
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
      </div>

      <div className="div-url-wrapper">
        {/* Bouton URL */}
        <input
          className="input-url"
          type="text"
          value={url}
          placeholder="Entrer l'URL"
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="checkbox-link">
          <input type="checkbox" id="checkbox-link" />
          <label htmlFor="checkbox-link">Target</label>
        </div>
        <img
          onClick={addLink}
          className="bubble-menu-picto"
          src="share-link.png"
          alt=""
        />
      </div>
    </div>
  );
};
