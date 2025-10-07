import { useRef } from "react";
import { loadFromFileJSON } from "../../utils/saveFileToJSON";

export const LoadFileButton = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) loadFromFileJSON(editor, file);
  };

  return (
    <>
      <button
        type="button"
        className="btn"
        id="btn-input"
        onClick={handleClick}
      >
        Charger
      </button>
      <input
        type="file"
        id="btn-input"
        ref={hiddenFileInput}
        className="btn"
        style={{ display: "none" }}
        accept=".json"
        onChange={handleChange}
      />
    </>
  );
};
