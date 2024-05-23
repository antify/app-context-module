import {defineBuildConfig} from 'unbuild'

export default defineBuildConfig({
	// declaration: true,
	externals: [
		'@antify/validate',
		'cookie-es',
		'h3'
	]
});
