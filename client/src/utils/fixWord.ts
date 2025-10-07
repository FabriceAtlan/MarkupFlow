const specialWord = [
	{source: "CO2", dest: "CO₂"},
	{source: "m2", dest: "m²"},
	{source: "m3", dest: "m³"},
]

export function modifySpecialWord(text: string): string {
	let cleaned = text;

	specialWord.forEach(({ source, dest}) =>{
		const regex = new RegExp(source, "g");
		cleaned = cleaned.replace(regex, dest);
	});

	return cleaned
}