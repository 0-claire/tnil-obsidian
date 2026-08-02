interface console { log: () => void }

export type Lexicon = {
	roots: Array<Root>;
	affixes: {
		standard: Array<StandardAffix>;
		accessor: Array<CaseAccessorAffix>;
		stacking: Array<CaseStackingAffix>;
	};
};

export type Root = {
	root: string;
	refers?: string;
	stems?: [
		Specs | string,
		Specs | string,
		Specs | string
	];
	/** Notes in markdown format */
	notes?: string;
	/** See the root below if the stems are empty as they may have similar pattern */
	see?: string;
};

export type Specs = {
	/** basic */
	"BSC": string;
	/** contential */
	"CTE": string;
	/** constitutive */
	"CSV": string;
	/** objective */
	"OBJ": string;
};


export type StandardAffix = {
	name: string;
	description: string;
	gradient_type: "0" | "A1" | "A2" | "B" | "C" | "D1" | "D2";
	cs: string;
	associated_root: boolean;
	degrees: [
		// Degree 0
		Degree | null,
		// Below are Degree 1~9
		Degree,
		Degree,
		Degree,
		Degree,
		Degree,
		Degree,
		Degree,
		Degree,
		Degree
	];
	notes?: string;
};

export type Degree =
	| string // Suitable for most situations
	| [string, string]; // Suitable for the situation where the Type-2 of current affix has another meaning


export type Case = {
	cs: string;
	/* All possible vowel forms */
	vx: Array<string>;
	description: string;
};

export type CaseAccessorAffix = {
	name: string;
	description: string;
	gradient_type: string;
	types: [
		// Type-1
		Array<Case>,
		// Type-2
		Array<Case>,
		// Type-3
		Array<Case>
	];
};

export type CaseStackingAffix = {
	name: string;
	description: string;
	gradient_type: string;
	cases: Array<Case>;
};

export function isStandardAffix(object): object is StandardAffix {
	return object.gradient_type !== undefined;
}
