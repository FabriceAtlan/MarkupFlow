import { EditorProvider } from "../context/EditorContext";
import { Editor } from "../components/Editor/Editor";
import EditorButtons from "../components/FormTools/EditorButtons";
import "../styles/components/editor.scss";
import { Toolbar } from "../components/Editor/Toolbar";

export default function EditorPage() {
  return (
    <EditorProvider>
      <section className="editor-container">
        <EditorButtons />
        <Toolbar />
        <Editor />
      </section>
    </EditorProvider>
  );
}
