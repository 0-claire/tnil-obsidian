import { Plugin, } from 'obsidian';
import { parseToFontCompatibleString } from 'TNILBot/transform';
import './styles.scss';

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
				} else if (item.innerText?.startsWith('$tnil-search')) {
				}
			});
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

