import {useRuntimeConfig, useCookie, computed, refreshCookie, useState} from '#imports';
import {appContextValidator} from '../validators';
import type {AppContext} from '../types';

export default function() {
	return useState('appContext', () => {
		const {appContextCookieName} = useRuntimeConfig().public.appContextModule;
		const appContextCookie = useCookie<AppContext | null>(appContextCookieName);
		const appContext = computed<AppContext | null>({
			get() {
				if (!appContextCookie.value) {
					return null;
				}

				const context = appContextValidator.validate(appContextCookie.value);

				if (!appContextValidator.hasErrors()) {
					return context;
				}

				return null;
			},
			set() {
				throw new Error('Do not set appContext directly. Use setContext method instead.')
			}
		});

		return {
			context: appContext,
			setContext(appId: string, tenantId: string | null = null) {
				appContextCookie.value = {appId, tenantId};
				refreshCookie(appContextCookieName);
			},
			clear() {
				appContextCookie.value = null;
				refreshCookie(appContextCookieName);
			}
		}
	});
}
