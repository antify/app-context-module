import {getCookie, useRuntimeConfig} from '#imports';
import {useAppContextValidator} from './validators';
import {type AppContext} from '../types';
import {type H3Event} from 'h3';

const {appContextCookieName} = useRuntimeConfig().appContextModule;

export function isValidAppContextHandler(event: H3Event): AppContext {
	const rawContext = getCookie(event, appContextCookieName);

	if (rawContext === undefined) {
		throw new Error('Missing app context. This request must include an app context cookie');
	}

	let parsedContext;

	try {
		parsedContext = JSON.parse(rawContext);
	} catch (e) {
		throw new Error(`Invalid app context. The app context cookie is not a valid JSON string: ${e.message}`);
	}

	const appContextValidator = useAppContextValidator();
	const context = appContextValidator.validate(parsedContext);

	if (appContextValidator.hasErrors()) {
		throw new Error(`Invalid app context. The data structure of the given app context cookie is invalid: ${appContextValidator.getErrorsAsString()}`);
	}

	return context;
}
