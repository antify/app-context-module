import {defineNuxtPlugin, useAppContext} from '#imports';

export default defineNuxtPlugin(() => {
	return {
		provide: {
			appContextModule: useAppContext().value
		}
	}
})
