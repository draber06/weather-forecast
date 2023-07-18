module.exports = {
	root: true,
	env: {
		browser: true,
		es2020: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	settings: {
		react: {
			version: "detect",
		},
	},
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
};
