import { useEditorContext } from "../../context/EditorContext";
import { copieEditorContent } from "../../utils/copieEditorContent";
import { saveToFileJSON } from "../../utils/saveFileToJSON";
import { LoadFileButton } from "../loadFileButton/LoadFileButton";

export default function EditorButtons() {
  const editor = useEditorContext();

  return (
    <section className="form-tools">
      <button
        className="btn"
        onClick={() => copieEditorContent(editor, "html")}
      >
        Copier HTML
      </button>

      <button
        className="btn"
        onClick={() => {
          editor.commands.setContent("");
          editor.commands.clearContent();
          editor.commands.focus();
        }}
      >
        Nouveau
      </button>

      <button
        className="btn"
        onClick={() => {
          saveToFileJSON(editor);
        }}
      >
        Sauvegarder
      </button>

      <LoadFileButton editor={editor} />
    </section>
  );
}
