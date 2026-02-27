import type { SearchSettings, StandardMorpheme } from './main.js';
import { parseToFontCompatibleString } from 'TNILBot/transform';
import {
	Lexicon, Root, StandardAffix, isStandardAffix, Specs
} from './types.js';
import lexicon_json from './lexicon/lexicon_en.json' with { type: 'json'};
const lexicon: Lexicon = (lexicon_json as Lexicon);

type SchrodingersMorpheme = Root | StandardAffix;

// maps to a standard object
export function mapStandard(morpheme: SchrodingersMorpheme): StandardMorpheme {
	for(const field in morpheme) {
		morpheme[field] = typeof morpheme[field] === 'string' ? morpheme[field].toLowerCase() : morpheme[field];
	}
	if(isStandardAffix(morpheme)) {
		return {
			consonant: morpheme.cs,
			refers: '',
			description: morpheme.description,
			name: morpheme.name,
			notes: morpheme.notes || morpheme.description
		};
	} else {
		return {
			consonant: morpheme.root,
			refers: morpheme.refers || '',
			description: '',
			name: '',
			notes: morpheme.notes || '',
		};
	}
}

function filter(object: SchrodingersMorpheme, input: string, searchSettings: SearchSettings): boolean {
	const source = mapStandard(object);

	const search = input.toLowerCase();

	for (const field in source) {
		if(searchSettings.fields[field] === true && source[field] && source[field].indexOf(search) !== -1)
			return true;
	}
	return false;
}


export function search(input: string, settings: SearchSettings): { roots: Root[], affixes: StandardAffix[] } {



	let roots: Root[] = [];
	let affixes: StandardAffix[] = [];

	if (settings.searchType === 'lexicon') {
		roots = lexicon.roots.filter(e => filter(e, input, settings));
		affixes = lexicon.affixes.standard.filter(e => filter(e, input, settings));
	} else if (settings.searchType === 'roots') {
		roots = lexicon.roots.filter(e => filter(e, input, settings));
	} else if (settings.searchType === 'affixes') {
		affixes = lexicon.affixes.standard.filter(e => filter(e, input, settings));
	}

	console.log("roots, affixes:", [roots, affixes]);
				// resultsDiv.createEl();
	return {
		roots,
		affixes
	};
}

export async function render(contentdiv, roots, affixes) {
	contentdiv.innerText = '';
	const resultsDiv = contentdiv.createEl('div');
	const count = resultsDiv.createDiv();
	count.innerText = "count: " + (roots.length + affixes.length);
	const rootsDisplay = resultsDiv.createEl('ul', { cls: 'root-display' });
	const affixesDisplay = resultsDiv.createEl('ul', { cls: 'affix-display' });

	for (const root of roots) {
		await renderRoot(rootsDisplay.createEl('li'), root);
	}
	for (const affix of affixes) {
		const li = affixesDisplay.createEl('li');
		li.innerText = `${affix.name.toUpperCase()} -${affix.cs} type:${affix.gradient_type} ${affix.description}`;
		for (let i = 1; i < 10; i++) {
			const degree = li.createEl('div');
			degree.innerText = `${i}: ${affix.degrees[i] || ''}`;
		}
	}
}

async function renderRoot(li: HTMLElement, root: Root) {
	li.createEl('div');
	li.createEl('span', {
		cls: 'consonant',
		text: `${root.root}` 
	});
	li.createEl('span', {
		cls: 'tnil',
		text: `${await parseToFontCompatibleString('a' + root.root + 'al')}` 
	});
	li.createEl('div', {
		cls: 'refers',
		text: `${root.refers || ''}` 
	});

	if(root.stems)
		for(const stem of root.stems) {
			const div = li.createEl('div', { cls: 'stem' });
			div.createEl('span', {
				cls: 'stem-number',
				text: `${root.stems.indexOf(stem) + 1}: ` 
			});
			if(typeof stem === 'string') {
				div.createEl('span', {
					cls: 'stem-description stem-simple',
					text: `${stem}` 
				});
			} else {
				for(const key in stem) {
					const subdiv = div.createEl('div');
					subdiv.createEl('span', {
						cls: 'specification-number',
						text: `${key}` 
					});
					subdiv.createEl('span', {
						cls: 'specification-description',
						text: `: ${stem[key as keyof Specs]}` 
					});
				}
			}
		}

	if(root.see)
		li.createEl('div', { text: `See: ${root.see}` });
	if(root.notes)
		li.createEl('div', { text: `Notes: ${root.notes}` });
}
