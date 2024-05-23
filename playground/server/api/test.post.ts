import {defineEventHandler} from '#imports';
import {useAppContext, isValidAppContextHandler} from '#app-context-module';

export default defineEventHandler(async (event) => {
	return {
		contextFromHandler: isValidAppContextHandler(event),
		contextFromGetContext: useAppContext(event)
	};
})
