import { useEditorContext } from "../../context/EditorContext";
import { copieEditorContent } from "../../utils/copieEditorContent";
import { saveToFileJSON } from "../../utils/saveFileToJSON";
import { LoadFileButton } from "../loadFileButton/LoadFileButton";
import "../../styles/components/EditorButtons.scss";

export default function EditorButtons() {
  const editor = useEditorContext();

  return (
    <section className="form-tools">
      <button
        className="btn"
        onClick={() => copieEditorContent(editor, "html")}
      >
        Copy
      </button>

      <button
        className="btn"
        onClick={() => {
          editor.commands.setContent("");
          editor.commands.clearContent();
          editor.commands.focus();
        }}
      >
        New
      </button>

      <button
        className="btn"
        onClick={() => {
          saveToFileJSON(editor);
        }}
      >
        Save
      </button>

      <LoadFileButton editor={editor} />
    </section>
  );
}
