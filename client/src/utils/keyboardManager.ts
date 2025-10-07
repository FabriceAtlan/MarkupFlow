import { Extension } from "@tiptap/react";

export const shortCut = Extension.create({
	name: "shortCut",
	addKeyboardShortcuts() {
		return {
			// Heading h1-h3
			"Mod-Alt-1": () => this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
			"Mod-Alt-2": () => this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
			"Mod-Alt-3": () => this.editor.chain().focus().toggleHeading({ level: 3 }).run(),
			"Mod-Alt-4": () => this.editor.chain().focus().toggleHeading({ level: 4 }).run(),

			// Bullet list
			"Mod-Alt-l": () => this.editor.chain().focus().toggleBulletList().run()
		}
	}
})