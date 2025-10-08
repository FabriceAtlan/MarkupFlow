import { useEditorContext } from "../../context/EditorContext";
import { copieEditorContent } from "../../utils/copieEditorContent";
import { saveToFileJSON } from "../../utils/saveFileToJSON";
import { LoadFileButton } from "../loadFileButton/LoadFileButton";
import "../../styles/components/EditorButtons.scss";

export default function EditorButtons() {
  const editor = useEditorContext();

  return (
    <section className="form-tools">
      <img
        src="picto-copy.png"
        alt=""
        className="btn"
        onClick={() => copieEditorContent(editor, "html")}
      />

      <img
        src="picto-refresh.png"
        alt=""
        className="btn"
        onClick={() => {
          editor.commands.setContent("");
          editor.commands.clearContent();
          editor.commands.focus();
        }}
      />

      <img
        src="picto-save.png"
        alt=""
        className="btn"
        onClick={() => {
          saveToFileJSON(editor);
        }}
      />

      <LoadFileButton editor={editor} />
    </section>
  );
}
