import {defineEventHandler} from '#imports';
import {useAppContext} from '#app-context-module';

export default defineEventHandler(async (event) => {
	const {handleRequest, getContext} = useAppContext();

	const contextFromHandler = handleRequest(event);
	const contextFromGetContext = getContext(event);

	return {
		contextFromHandler,
		contextFromGetContext
	};
})
