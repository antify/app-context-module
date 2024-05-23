import {
	isTypeOfRule,
	notBlankRule,
	useValidator,
	Types
} from '@antify/validate';
import type {AppContext} from './types';

export const appContextValidator = useValidator<AppContext>({
	appId: {
		rules: [
			notBlankRule
		]
	},
	tenantId: {
		rules: [
			(val) => isTypeOfRule(val, [Types.STRING, Types.NULL]),
			(val) => isTypeOfRule(val, Types.STRING) === true ? notBlankRule(val) : true
		]
	},
});
