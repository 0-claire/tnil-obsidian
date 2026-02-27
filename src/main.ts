import { Plugin, } from 'obsidian';
import { parseToFontCompatibleString } from 'TNILBot/transform';
import './styles.scss';
import { search, render } from './search.js';



export type SearchSettings = {
				fields: SearchFields;
				searchType: SearchType;
			};

export type SearchType = "lexicon" | "affixes" | "roots" | "morphology";

export interface SearchFields {
	refers: boolean;
	consonant: boolean;
	description: boolean;
	name: boolean;
	notes: boolean;
}
export type StandardMorpheme = {
	[Property in keyof SearchFields as string]: string;
}

export default class TNILPlugin extends Plugin {

	async onload() {
		// await this.loadSettings();

		this.registerMarkdownPostProcessor((element) => {
			const blocks = element.querySelectorAll('code');
			blocks.forEach(async (item/*: HTMLElement*/) => {
				if (item.innerText.startsWith('$tnil ')) {
					try {
						item.innerText = await parseToFontCompatibleString(item.innerText.replace(/^\$tnil /, ''));
						item.className = item.className + ' tnil';
					} catch (e) {
						item.innerText = " --- Error parsing text: " + (e as { message: string }).message;
					}
				} else if (item.innerText.startsWith('$tnil-raw ')) {
					item.className = item.className + ' tnil';
					item.innerText = item.innerText.replace(/^\$tnil-raw /, '');
				} else if (item.innerText?.startsWith('$tnil-handwritten ')) {
					try {
						item.innerText = await parseToFontCompatibleString(item.innerText.replace(/^\$tnil-handwritten /, ''));
						item.className = item.className + ' tnil-handwritten';
					} catch (e) {
						item.innerText = " --- Error parsing text: " + (e as { message: string }).message;
					}
					item.innerText = item.innerText.replace(/^\$tnil-handwritten /, '');
				} else if (item.innerText?.startsWith('$tnil-raw-handwritten ')) {
					item.className = item.className + ' tnil-handwritten';
					item.innerText = item.innerText.replace(/^\$tnil-raw-handwritten /, '');
				}
			});
		});



		this.registerMarkdownCodeBlockProcessor("tnil-search", async (source, el, /*ctx*/) => {
			const searchSettings: SearchSettings = {
				fields: {
					refers: false,
					consonant: true,
					description: false,
					name: false,
					notes: false,
				},
				searchType: "lexicon",
			};

			const searchDiv = el.createEl('div');
			const searchInput = searchDiv.createEl('input');
			const fieldsCheckBoxes = searchDiv.createDiv();

			for (const field in searchSettings.fields) {
				const div = fieldsCheckBoxes.createEl('span');
				const input = div.createEl('input', { type: 'checkbox' });
				input.checked = searchSettings.fields[field];

				input.addEventListener('change', (ev: Event & { target: HTMLInputElement }) => {
					searchSettings.fields[field] = ev.target.checked;
				});

				div.createEl('label', { text: field });
				div.style.marginLeft = '5px';
			}

			const searchTypeSelect = searchDiv.createEl('select');
			searchTypeSelect.innerHTML = ' \
			<option value="lexicon">lexicon</option> \
			<option value="roots">roots</option> \
			<option value="affixes">affixes</option> \
			<option value="morphology">morphology</option> \
			';

			searchTypeSelect.addEventListener('change', (ev) => {
				searchSettings.searchType = (ev.target as HTMLInputElement).value as SearchType;
			});

			// regex checkbox
			// ignore punctuation (non alphanumeric) checkbox

			const contentdiv = el.createEl('div');


			searchInput.addEventListener('change', (event) => {
				if(event.target) {
					const { roots, affixes } = search((event.target as unknown as {value: string}).value, searchSettings);
					render(contentdiv, roots, affixes);
				}
			});

			// contentdiv.innerText = source;
			const options = [
				"lexicon",
				"affixes",
				"roots",
				"morphology",
				"docs"
			];
			// const command = contentdiv.innerText.replace(/^\$tnil-search /, '').split(' ')[0];
			// if (!options.includes(command)) {
			// 	contentdiv.innerText = " --- Command not valid";
			// } else {
			// 	switch (command) {
			// 		case "lexicon": {
			// 			contentdiv.innerText = Object.keys(lexicon_json).join(', ');
			// 			// generate output
			// 		}
			// 	}
			// }
		});
		

		this.registerMarkdownCodeBlockProcessor("tnil-raw", async (source, el, ctx) => {
			const contentdiv = el.createEl('div');
			contentdiv.innerText = source;
			contentdiv.classList.add('tnil');
		});
		this.registerMarkdownCodeBlockProcessor("tnil-handwritten-raw", async (source, el, ctx) => {
			const contentdiv = el.createEl('div');
			contentdiv.innerText = source;
			contentdiv.classList.add('tnil-handwritten');
		});
		this.registerMarkdownCodeBlockProcessor("tnil", async (source, el, ctx) => {
			const contentdiv = el.createEl('div');
			contentdiv.innerText = source;
			contentdiv.classList.add('tnil');
		});
		this.registerMarkdownCodeBlockProcessor("tnil-handwritten", async (source, el, ctx) => {
			const contentdiv = el.createEl('div');
			contentdiv.innerText = source;
			contentdiv.classList.add('tnil-handwritten');
		});

	}

	onunload() {
	}

	async loadSettings() {
	}

	async saveSettings() {
	}
}

