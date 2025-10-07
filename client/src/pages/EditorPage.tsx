import { EditorProvider } from "../context/EditorContext";
import { Editor } from "../components/Editor/Editor";
import EditorButtons from "../components/FormTools/EditorButtons";
import "../styles/components/editor.scss";
import { Toolbar } from "../components/Editor/Toolbar";

export default function EditorPage() {
  const headingList = [
    { id: 1, shortcut: "ctrl + alt + 1" },
    { id: 2, shortcut: "ctrl + alt + 2" },
    { id: 3, shortcut: "ctrl + alt + 3" },
    { id: 4, shortcut: "ctrl + alt + 4" },
  ];
  return (
    <EditorProvider>
      <section className="editor-container">
        <aside>
          <p>
            <strong>Niveau de titre</strong>
          </p>
          <ul>
            {headingList.map((e) => (
              <li key={e.id}>
                <strong>h{e.id}&nbsp;: </strong>
                <code>ctrl + alt {e.id}</code>
              </li>
            ))}
          </ul>

          <p>
            <strong>Liste à puces</strong>
          </p>
          <ul>
            <li>
              <strong>ul&nbsp;: </strong>
              <code>ctrl&nbsp;+&nbsp;Alt&nbsp;+&nbsp;l</code>{" "}
            </li>
          </ul>
        </aside>
        <Editor />
        <EditorButtons />
        <Toolbar />
      </section>
    </EditorProvider>
  );
}
