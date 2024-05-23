import type {H3Event} from 'h3';
import {AppContext} from '../types';
import {useAppContextValidator} from './validators';
import {getCookie, useRuntimeConfig} from '#imports';

const {appContextCookieName} = useRuntimeConfig().appContextModule;

export function useAppContext(event: H3Event): AppContext | null {
	const rawContext = getCookie(event, appContextCookieName);

	if (rawContext === undefined) {
		return null;
	}

	let parsedContext;

	try {
		parsedContext = JSON.parse(rawContext);
	} catch (e) {
		return null;
	}

	const appContextValidator = useAppContextValidator();
	const context = appContextValidator.validate(parsedContext);

	if (appContextValidator.hasErrors()) {
		return null;
	}

	return context;
}
