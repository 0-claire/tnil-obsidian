import { parseToFontCompatibleString, } from "TNILBot/transform";
import { SearchFields, SearchSettings, } from "./search.js";
import {
	Root, 
	StandardAffix, 
} from "./types.js";
import {
	ReactElement, 
	type Context, 
	createContext, 
	useContext, 
	useState, 
} from "react";

export class TNILUI {
	searchInProgress: boolean = false;
	options = [
		"lexicon",
		"affixes",
		"roots",
		"morphology",
		"docs",
	] as const;

	messageDiv: HTMLDivElement;
	contentdiv: HTMLDivElement;
	searchContext: ReturnType<typeof createContext<ReturnType<typeof useState<SearchSettings>>>>;
    content: string;

    parseOption(option: (typeof this.options)[number] | keyof SearchSettings['fields'] | keyof SearchSettings["settings"], searchSettingsState: ReturnType<typeof useState<SearchSettings>>) {
        const [searchSettings, setSearchSettings] = searchSettingsState;
        const value = option.startsWith('-') ? false : true;
        const finalOption = option.replace(/^-/, '');
        if()

        setSearchSettings(searchSettings)
    }

	constructor(el: HTMLElement) {
        // code box content
        this.content = el.innerText;
		this.messageDiv = el.createEl("div");
		this.contentdiv = el.createEl("div");


		const searchSettings: SearchSettings = {
			searchType: "lexicon",
			fields: {
				blurb: true,
				abbreviation: true,
				consonant: false,
				description: false,
				notes: false,
			},
			settings: {
				matchExactly: false,
				regex: false,
				ignoreCase: true,
			},
		};

        const searchSettingsState = useState(searchSettings);
        const [searchSettings, setSearchSettings] = searchSettingsState;
		this.searchContext = createContext(searchSettingsState);
        
        // TODO: read options from code box content
        const commands = this.content.split(/[ \n]/g);
        commands.forEach(i => parseOption(i, searchSettingsState))
	}

	SearchControlsForm = (): ReactElement => (
		<form action="" onSubmit={ (ev) => {
			if (ev.target) {
				if (this.searchInProgress) {
					this.messageDiv.innerText = "Another search is in progress, please wait";
					return;
				} else {
					// clearTimeout(search);
					// search = setTimeout(async () => { await performSearch(event); searchInProgress = false;}, 1*1000);
					this.performSearch();
				}
			}
		}}/>
	);

	SearchControls() {
		const [searchSettings, setSearchSettings,] = useContext(this.searchContext);

		return (
			<div>
				<this.SearchControlsForm>
					<input id="search-input" type="text">
					</input>
					{
						Object.keys(searchSettings.fields).map(field =>
							<span style={ { marginLeft: "5px", } }>
								<input type="checkbox" key={field}
									defaultValue={searchSettings.fields[field].checked}
									onChange={
										(ev: Event) => searchSettings.fields[field] = (ev.target as HTMLInputElement).checked
									}
								/>
								<label>{field}</label>
							</span>)
					}
					{
						(Object.keys(searchSettings.settings) as Array<keyof SearchSettings["settings"]>).map(setting =>
							<span style={ { marginLeft: "5px", } }>
								<input type="checkbox"
									defaultValue={searchSettings.settings[setting]}
									onChange={
										(ev) => searchSettings[setting] = ev.target.checked
									}/>
								<label>{setting}</label>
							</span>)
					}
					<this.SearchTypeSelect/>
				</this.SearchControlsForm>
			</div>
		);
	}

	SearchTypeSelect(): ReactElement {
		const [searchSettings, setSearchSettings,] = useContext(this.searchContext);

		return (

			<select onChange={
				(ev) => setSearchSettings(Object.assign(searchSettings, { searchType: ev.target.value as SearchType, }))
			}>
				<option value="lexicon">lexicon</option> 
				<option value="roots">roots</option> 
				<option value="affixes">affixes</option> 
				<option value="morphology">morphology</option> 
			</select>
		);
	}

	async performSearch(event: Event) {
		this.messageDiv.innerText = "Searching...";
		this.searchInProgress = true;
		try {
			const { 
				roots, 
				affixes, 
			} = await filterLexicon((event.target as unknown as { value: string }).value, searchSettings);
			reactRoot.render(<RenderLexicon roots={roots} affixes={affixes}/>);
			messageDiv.innerText = "Done!";
		} catch (e) {
			messageDiv.innerText = "An error occurred with this search. See the console for more";
			console.error(e);

		}

		searchInProgress = false;
	}


	LexiconSearch(): ReactElement {
		return (
			<>
				<this.searchContext value={[searchData, setSearchData,]}>
					<this.SearchControls/>
					<RenderLexicon context={this.searchContext}/>
				</this.searchContext>
			</>
		);
	}

	RenderLexicon(LexiconContext: Context<SearchObject>): ReactElement {
		const { 
			roots, 
			affixes, 
		} = useContext(LexiconContext);
		return <>
			<div>
				<div>count: {roots.length + affixes.length}</div>
				<ul className="root-display">
					{roots.map(root => <RenderRoot key={root.root} root={root}/>)}
				</ul>
				<ul className="affix-display">
					{affixes.map(affix => <RenderAffix key={affix.cs} affix={affix}/>)}
				</ul>
			</div>
		</>;
	}

	async RenderRoot({ root, }: { root: Root }): Promise<ReactElement> {
	// TODO: put specifications in a cleaner table & other stems on the sides
		return (<>
			{/*// Display root in script*/}
			<span className='tnil' style={{ marginRight: "10px", }}>
				{`${await parseToFontCompatibleString("a" + root.root + "al")}`}
			</span>

			{/* Display root in romanization, with togglable spoiler */}
			<span className='tnil-plaintext'>
				{`${root.root.toLocaleUpperCase()}`}
			</span>
		</>);
	}

	findRootByConsonant(cs: string): Root | null {
		for (const root of lexicon.roots) {
			if (root.root === cs)
				return root;
		}

		return null;
	}


	RenderAffix({ affix, }: { affix: StandardAffix }): ReactElement {
		return (
			<li>
				<div>
					{`${affix.name.toLocaleUpperCase()} -${affix.cs} type:${affix.gradient_type} ${affix.description}`}
				</div>
				<div>
					{
						affix.degrees.map(degree =>
							<div key={degree || ""}>{degree || ""}</div>)
					}
				</div>
			</li>
		);
	}

}
