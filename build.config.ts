import {defineBuildConfig} from 'unbuild'

export default defineBuildConfig({
	// declaration: true,
	externals: [
		// TODO:: doublecheck with code
		'@antify/database',
		'@antify/ui-module',
		'@antify/database-module',
		'@antify/validate',
		'@fortawesome/free-solid-svg-icons',
		'crypto',
		'date-fns',
		'h3',
		'jose',
		'mongoose',
		'ofetch',
		'pathe',
		'pinia',
		'#vue-router'
	]
});
