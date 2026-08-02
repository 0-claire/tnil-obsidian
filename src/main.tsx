import { Plugin } from "obsidian";
import { createRoot } from "react-dom/client";
import { parseToFontCompatibleString } from "TNILBot/transform";
import "./styles.scss";
import {
	RenderRoot, 
	RenderAffix 
} from "./search.js";
import { LexiconSearch } from "./search.js";
import { parse } from "path";


export default class TNILPlugin extends Plugin {
	worker?: unknown;

	async onload() {
		// await this.loadSettings();

		const worker = new Worker("worker.js");
		worker.onmessage = (ev) => {
			console.log("from worker received message:", ev.data);
		};
		worker.onerror = (x) => {
			console.error("worker error:", x);
		};
		worker.postMessage("hi");
		this.worker = worker;

		this.registerMarkdownPostProcessor((element) => {
			const blocks = element.querySelectorAll("code");
			blocks.forEach(async (item: HTMLElement) => {
				const reactRoot = createRoot(item);

				const tnilText = item.innerText.replace(/^\$tnil[^ ]* /, "");

				type Command = "tnil" | "tnil-raw" | "tnil-handwritten" | "tnil-raw-handwritten" | "tnil-root" | "tnil-affix";
				const symbol = "$";
				const symbolRegexEscaped = `\\${symbol}`;
				const beginsWithCommand = (text: string): boolean => item.innerText?.startsWith(symbol+text+" ");

				const toTnilElement = async (element: HTMLElement, text: Command, { 
					textCallback,
					itemAndTextCallback, 
				}: { 
					textCallback?: ((arg0: string) => any)|((arg0: string) => Promise<any>);
					itemAndTextCallback?: ((arg0: HTMLElement,text: string) => any)|((arg0: HTMLElement,text: string) => Promise<any>); 
				} = {}): Promise<string>  => {

					element.className = element.classList.add(text);
					const plainTextWithoutCommand = element.innerText.replace(new RegExp(`^${symbolRegexEscaped}${text} `), "");

					try {
						if(textCallback)
							item.innerText = await textCallback(plainTextWithoutCommand);
						if(itemAndTextCallback)
							await itemAndTextCallback(element, plainTextWithoutCommand);
						else
							element.innerText = plainTextWithoutCommand;
					} catch (error) {
						item.innerText = " --- Error parsing text: " + (error as { message: string }).message;
					}
					return plainTextWithoutCommand;
				};


				if (beginsWithCommand("$tnil ")) {
					await toTnilElement(
						item, 
						"tnil", 
						{ textCallback: parseToFontCompatibleString, }
					);
				} else if (beginsWithCommand("tnil-raw")) {
					await toTnilElement(item, "tnil-raw");
				} else if (beginsWithCommand("tnil-handwritten")) {
					await toTnilElement(item, "tnil-handwritten");
				} else if (beginsWithCommand("tnil-raw-handwritten")) {
					await toTnilElement(item, "tnil-raw-handwritten");
				}


				else if (beginsWithCommand("$tnil-root ")) {
					item.className = item.className + " tnil-root";
					const root = item.innerText.replace(/^\$tnil-root /, "");
					const rootData = findRootByConsonant(root);
					if (!rootData) {
						item.innerText = " --- No root with consonant " + root + " found in lexicon";
						return;
					}
					reactRoot.render(<RenderRoot root={rootData}/>);
				} else if (item.innerText?.startsWith("$tnil-affix ")) {
					item.className = item.className + " tnil-affix";
					const affix = item.innerText.replace(/^\$tnil-affix /, "");
					const affixData = this.findAffixByConsonant(affix);
					if (!affixData) {
						item.innerText = " --- No affix with consonant " + affix + " found in lexicon";
						return;
						
					}
					reactRoot.render(<RenderAffix affix={affixData}/>);
					// await RenderAffix(item.innerText.replace(/^\$tnil-affix /, ''));
				}

				item.parentNode?.createEl("span", { 
					cls: "tnil-plaintext",
					text: tnilText, 
				});
			});
		});



		this.registerMarkdownCodeBlockProcessor("tnil-search", async (source, el /*ctx*/) => {
			const reactRoot = createRoot(el);
			reactRoot.render(<LexiconSearch/>);
			searchInput.addEventListener("change", async (event) => {
			});

			// contentdiv.innerText = source;

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
			const contentdiv = el.createEl("div");
			contentdiv.innerText = source;
			contentdiv.classList.add("tnil");
		});
		this.registerMarkdownCodeBlockProcessor("tnil-handwritten-raw", async (source, el, ctx) => {
			const contentdiv = el.createEl("div");
			contentdiv.innerText = source;
			contentdiv.classList.add("tnil-handwritten");
		});
		this.registerMarkdownCodeBlockProcessor("tnil", async (source, el, ctx) => {
			const contentdiv = el.createEl("div");
			contentdiv.innerText = source;
			contentdiv.classList.add("tnil");
		});
		this.registerMarkdownCodeBlockProcessor("tnil-handwritten", async (source, el, ctx) => {
			const contentdiv = el.createEl("div");
			contentdiv.innerText = source;
			contentdiv.classList.add("tnil-handwritten");
		});

	}

	onunload() {
	}

	async loadSettings() {
	}

	async saveSettings() {
	}
}
