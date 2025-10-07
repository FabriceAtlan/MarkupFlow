export const saveToFileJSON = (editor: any) => {
	if (!editor) return;

	const content = editor.getJSON();

	const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json"});

	const url = URL.createObjectURL(blob);
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = "document.json";
	anchor.click();
	URL.revokeObjectURL(url);
}

export const loadFromFileJSON = (editor: any, file: File) => {
	const reader = new FileReader();

	reader.onload = ()=> {
		const result = reader.result as string;

		try {
			const content = JSON.parse(result);
			editor.commands.setContent(content);
		} catch  {
			console.error("Le fichier n'est pas un json valide.");
		}
	};
	reader.readAsText(file);
}