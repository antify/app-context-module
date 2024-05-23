# App Context Module

Separate your nuxt app into multiple different apps.
It also provides multi-tenancy support per app instance. 
It's for monolithic architectures.

It provides components and composables to manage and store the current app context, the user is at
the moment client and server side.

## Architecture

One app have his own business logic. It has his own reason why it exists.
An app configured as multi tenancy means, that this app in every instance does the same things but
keeps its data, users, permissions etc. separated from other instances. But the business logic of all instances is the
same.

Example app architecture:
- Cockpit for system-wide administration
- End user App (multi tenancy)

# TODO

- [ ] Docs
- [ ] Types for useAppContext server side
- [ ] Make it extendable from outside for other modules which need additional data in app configuration.
- [ ] Add helper components to switch between apps.

## Usage

### Set app context

Set an app context client side, to store it in browser for the session.

```typescript
import {useAppContext} from '#app-context-module';

// Set a specific one
useAppContext().value.setContext('my-app', 'my-tenant-id');

// or clear it
useAppContext().value.clearContext();
```

### Get app context client side

```typescript
import {useAppContext} from '#app-context-module';

// Get it from composable
const {appId, tenantId} = useAppContext().value.context;

// or from plugin
const {$appContextModule} = useNuxtApp();
const {appId, tenantId} = $appContextModule.context;
```

### Get app context server side

```typescript
import {
	useAppContext, isValidAppContextHandler, type AppContext
} from '#app-context-module';

// Validate the context and get it
const context: AppContext = isValidAppContextHandler(event);

// or get it without validation
const context: AppContext | null = useAppContext(event);
```

# Installation

```bash
pnpm i @antify/app-context-module
```

Add it to your `nuxt.config.ts`:

```typescript
export default {
	modules: [
		'@antify/app-context-module'
	]
}
```

# Configuration

```typescript
export default defineNuxtConfig({
	modules: [
		'@antify/app-context-module',
	],
	appContextModule: {
		apps: [
			{
				id: 'one-app',
			},
			{
				id: 'another-app',
				isMultiTenant: true
			}
		]
	}
});
```

## Development

- Run `pnpm run dev:prepare` to generate type stubs.
- Use `pnpm run dev` to start [playground](./playground) in development mode.
