import js from "@eslint/js";
// import globals from "globals";
import tseslint from "typescript-eslint";
// import { defineConfig } from "eslint/config";


// export default defineConfig([
export default [
	js.configs.recommended,
	{
		// Ignore all other files
		ignores: ['**/*.js'],
		rules: {
			"padding-line-between-statements": [
    		  "warn",
    		  {
					blankLine: "always",
					prev: "function",
					next: "function" 
				}
    		],
    		semi: ["warn", "always"],
            // quotes: ["warn", "double"],
			// curly: ["warn", "multi"],
			// "max-len": ["warn", { code: 80 }],
    		"object-curly-newline": [ "error", {
				multiline: true,
				minProperties: 3 
			} ],
			'object-curly-spacing': [ 'warn', 'always' ],
			"object-property-newline": ["warn", { allowAllPropertiesOnSameLine: false }],
			"object-shorthand": ["warn", "always", { avoidQuotes: true }],
			indent: ["warn", "tab", { ignoreComments: true }],
			// "@typescript-eslint/no-explicit-any": ["warn"],
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"quote-props": ["warn", "as-needed"],
			// "no-undef": 'none',
			'no-mixed-spaces-and-tabs': 'warn',
			'no-useless-catch': 'warn',
			'no-extra-semi': 'warn',
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin,
		},
		languageOptions: {
			// comments: true,
		    parser: tseslint.parser,
			parserOptions: {
    		  ecmaVersion: 'latest',
    		  sourceType: 'module',
    		},
			// allow inline comments disabling xyz feature
			// eslintDisableDirective: true,
		},
		files: ["**/*.{ts,mts,cts}"],
	},
	// tseslint.configs.recommended,
	// ...tseslint.configs.recommended
];
