import { useEditorContext } from "../../context/EditorContext";
import { copieEditorContent } from "../../utils/copieEditorContent";
import { saveToFileJSON } from "../../utils/saveFileToJSON";
import { LoadFileButton } from "../loadFileButton/LoadFileButton";
import "../../styles/components/EditorButtons.scss";
import { useState } from "react";

export default function EditorButtons() {
  const editor = useEditorContext();
  const [clicked, setCicked] = useState<{ [id: string]: boolean }>({});

  const handlePopup = (id: string) => {
    setCicked((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCicked((prev) => ({ ...prev, [id]: false }));
    }, 1000);
  };

  const btn = [
    {
      id: "1",
      src: "picto-copy.png",
      title: "Copier tout le texte",
      text: "Copié",
      event: () => {
        copieEditorContent(editor, "html");
        handlePopup("1");
      },
    },
    {
      id: "2",
      src: "picto-refresh.png",
      title: "Effacer le contenu",
      text: "Effacé",
      event: () => {
        editor.commands.setContent("");
        editor.commands.clearContent();
        editor.commands.focus();
        handlePopup("2");
      },
    },
    {
      id: "3",
      src: "picto-save.png",
      title: "Sauvegarder le contenu",
      text: "Sauvegardé",
      event: async () => {
        const success = await saveToFileJSON(editor);
        if (success) handlePopup("3");
      },
    },
  ];

  return (
    <section className="form-tools">
      {btn.map((el) => (
        <div key={el.id} className="btn-wrapper">
          <img
            src={el.src}
            alt=""
            className="btn"
            onClick={el.event}
            title={el.title}
          />
          {clicked[el.id] && <span className="btn-popup">{el.text}</span>}
        </div>
      ))}
      <LoadFileButton editor={editor} />
    </section>
  );
}
