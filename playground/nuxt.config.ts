export default defineNuxtConfig({
	ssr: false,
	imports: {
		autoImport: false
	},
	devtools: {enabled: true},
	modules: [
		'../src/module',
		'@antify/ui-module',
	],
	appContextModule: {
		apps: [
			{
				id: 'cockpit',
			},
			{
				id: 'service',
				isMultiTenant: true
			}
		]
	}
});
