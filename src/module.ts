import {
	addPlugin,
	addImportsDir,
	createResolver,
	defineNuxtModule,
	addComponentsDir
} from '@nuxt/kit';
import {
	useValidator,
	isTypeOfRule,
	notBlankRule,
	Types
} from '@antify/validate';

type App = {
	id: string
	isMultiTenant?: boolean
}

export type ModuleOptions = {
	/**
	 * List of all apps in the system.
	 * Minimum one app is required.
	 */
	apps: [App, ...App[]];

	/**
	 * Cookie name where the users current context is stored.
	 */
	appContextCookieName: string;
};

type ValidatedModuleOptions = Required<ModuleOptions>;

const optionsValidator = useValidator<ValidatedModuleOptions>({
	// TODO:: Test if https://github.com/antify/validate/issues/7 is implemented
	apps: {
		rules: [
			(val) => isTypeOfRule(val, Types.ARRAY),
			(val) => (val || []).length > 0 || 'The apps array must have at least one app configured',
			(val) => {
				const duplicates: Record<string, true> = {};

				for (const app of val) {
					if (duplicates[app.id]) {
						return `Duplicate appId found: ${app.id}. AppId must be unique.`;
					}

					duplicates[app.id] = true;
				}

				return true;
			}
		]
	},

	appContextCookieName: {
		rules: [notBlankRule],
		defaultValue: 'antc'
	}
});

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'app-context-module',
		configKey: 'appContextModule',
		compatibility: {
			nuxt: '^3.10.0'
		}
	},
	async setup(options, nuxt) {
		if (JSON.stringify(options) === '{}') {
			// nuxt-module-build build --stub call this setup without any options. This would break the code.
			return;
		}

		const _options = optionsValidator.validate(options);

		if (optionsValidator.hasErrors()) {
			throw new Error(`Invalid options for app-context-module:\n${optionsValidator.getErrorsAsString()}`);
		}

		const {resolve} = createResolver(import.meta.url);
		const runtimeDir = resolve('runtime');

		nuxt.options.build.transpile.push(runtimeDir);
		nuxt.options.alias['#app-context-module'] = runtimeDir;

		nuxt.options.runtimeConfig.appContextModule = {
			apps: _options.apps,
			appContextCookieName: _options.appContextCookieName,
		};

		nuxt.options.runtimeConfig.public.appContextModule = {
			appContextCookieName: _options.appContextCookieName,
		}

		await addComponentsDir({
			path: resolve(runtimeDir, 'components'),
			pathPrefix: false,
			prefix: 'AuthorizationModule',
			global: true
		});

		addPlugin({
			src: resolve(runtimeDir, 'plugins', 'appContextModule.client'),
			mode: 'client',
			name: 'appContextModule'
		});

		addImportsDir(resolve(runtimeDir, 'composables'));

		nuxt.hook('nitro:config', (_config) => {
			_config.alias = _config.alias || {};

			_config.alias['#app-context-module'] = resolve(runtimeDir, 'server');
		});
	}
})
