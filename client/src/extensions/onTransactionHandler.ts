import type { Editor } from "@tiptap/react";
import { cleanText } from "../utils/cleanText";

export function onTransactionHandler({
	editor,
	transaction,
}: {
	editor: Editor;
	transaction: any;
}) {
	if (!transaction.docChanged) return;

	editor.state.doc.descendants((node, pos) => {
		if (!node.isText) return;

		const original = node.text || "";
		const cleaned = cleanText(original);

		if (cleaned !== original) {
			editor
			.chain()
			.focus()
			.command(({ tr }) => {
				tr.insertText(cleaned, pos, pos + node.nodeSize);
				return true;
			})
			.run();
		}

		// if (original.includes("\u00A0")) {}
	});
}

export default onTransactionHandler;