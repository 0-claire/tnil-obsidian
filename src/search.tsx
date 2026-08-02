import {
	Lexicon, 
	Root, 
	StandardAffix, 
	isStandardAffix,
} from "./types.js";
import lexicon_json from "./lexicon/lexicon_en.json" with { type: "json", };

export type SearchSettings = {
	fields: SearchFields;
	searchType: SearchType;
	settings: {
		matchExactly: boolean;
		regex: boolean;
		ignoreCase: boolean;
	};
};

export type SearchType = "lexicon" | "affixes" | "roots" | "morphology";

export interface SearchFields {
	blurb: boolean;
	consonant: boolean;
	description: boolean;
	abbreviation: boolean;
	notes: boolean;
}

export type StandardMorpheme = {
	[Property in keyof SearchFields as string]: string;
}

type SearchObject = { 
	roots: Root[]; 
	affixes: StandardAffix[]; 
};


const lexicon: Lexicon = (lexicon_json as Lexicon);
type SchrodingersMorpheme = Root | StandardAffix;



export default class TNILJSONInterface {
	lexicon = lexicon;

	constructor(parameters) {
        
	}

	findAffixByConsonant(cs: string): StandardAffix | null {
		for (const affix of lexicon.affixes.standard) {
			if (affix.cs === cs)
				return affix;
		}

		return null;
	}

	async search(input: string, settings: SearchSettings): Promise<SearchObject> {

		let roots: Root[] = [];
		let affixes: StandardAffix[] = [];

		if (settings.searchType === "lexicon") {
			roots = await this.filterLexicon(
				lexicon.roots, 
				input, 
				settings
			);
			affixes = await this.filterLexicon(
				lexicon.affixes.standard, 
				input, 
				settings
			);
		} else if (settings.searchType === "roots") {
			roots = await this.filterLexicon(
				lexicon.roots, 
				input, 
				settings
			);
		} else if (settings.searchType === "affixes") {
			affixes = await this.filterLexicon(
				lexicon.affixes.standard, 
				input, 
				settings
			);
		}


		return this.sortLexiconSearch({ 
			roots,
			affixes, 
		});
	}

	async filterLexicon<T extends SchrodingersMorpheme>(array: T[], input: string, searchSettings: SearchSettings): Promise<T[]> {
	// const source = mapStandard(object);

		const search = searchSettings.settings.ignoreCase ? input.toLowerCase() : input;

		const destFields: (keyof SearchFields)[] = [];
		for (const field in searchSettings.fields) {
			if (searchSettings.fields[field as keyof SearchFields] === true)
				destFields.push(field as keyof SearchFields);
		}

		return array.filter(schrodingersMorpheme => {
			const morpheme = this.mapStandard(schrodingersMorpheme);
			for (const field of destFields) {
				if (!morpheme[field])
					return false;

				const sourceField = searchSettings.settings.ignoreCase ? morpheme[field] : morpheme[field].toLowerCase();
				if (searchSettings.settings.regex === true) {
					try {
						const regex = new RegExp(search);
						if (regex.test(sourceField))
							return true;
						else continue;
					} catch (e) {
						console.error("invalid regex passed:" + search);
						throw "INVALID_REGEX";
					}
				} else if (searchSettings.settings.matchExactly === true) {
					if (sourceField == search)
						return true;
				} else {
					if (sourceField.indexOf(search) !== -1)
						return true;
				}
			}

			return false;
		});

	}

	// maps to a standard object
	mapStandard(morpheme: SchrodingersMorpheme): StandardMorpheme {
		for (const field in morpheme) {
			morpheme[field] = typeof morpheme[field] === "string"
				? morpheme[field].toLowerCase()
				: morpheme[field];
		}

		if (isStandardAffix(morpheme)) {
			return {
				consonant: morpheme.cs,
				blurb: morpheme.description,
				name: morpheme.name,
				notes: morpheme.degrees.join("\n"),
			};
		} else {
			return {
				consonant: morpheme.root,
				blurb: morpheme.refers || "",
				name: "",
				notes: morpheme.notes || "",
			};
		}
	}

	sortLexiconSearch(sobj: SearchObject): SearchObject {
	// Sort roots by length and then by string
		sobj.roots.sort((
			rootA, 
			rootB
		) => rootA.root.length - rootB.root.length != 0 ? rootA.root.length - rootB.root.length : rootA.root.localeCompare(rootB.root));
		sobj.affixes.sort((
			affixA, 
			affixB
		) => affixA.description.localeCompare(affixB.description));
		return sobj;
	}
}

