import {
	Types,
	isOneOfRule,
	isTypeOfRule,
	notBlankRule,
	useValidator
} from '@antify/validate';
import {AppContext} from '../types';
import {useRuntimeConfig} from '#imports';

const {apps} = useRuntimeConfig().appContextModule;

// TODO:: Do not define the whole validator twice if https://github.com/antify/validate/issues/11 is implemented
export const appContextValidator = useValidator<AppContext>({
	appId: {
		rules: [
			notBlankRule,
			(val) => isOneOfRule(val, apps.map(app => app.id))
		]
	},
	tenantId: {
		rules: [
			(val) => isTypeOfRule(val, [Types.STRING, Types.NULL]),
			(val) => isTypeOfRule(val, Types.STRING) === true ? notBlankRule(val) : true,
			(val, formData) => {
				const isMultiTenant = apps.find(app => app.id === formData.appId)?.isMultiTenant;

				if (isMultiTenant && typeof val !== 'string') {
					return `App ${formData.appId} is multi tenant. The tenantId must be set.`;
				}

				return true;
			}
		]
	},
});
