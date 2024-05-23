# App Context Module

With this module, you can separate your nuxt app into multiple different apps.
It also provides multi-tenancy support per app. It's for monolithic architectures.

It provides components and composables to manage and store the current app context, the user is at
the moment client and server side.

## Architecture

One app have his own business logic. It has his own reason why it exists.
An app configured as multi tenancy means, that this app in every instance does the same things but 
keeps its data, users, permissions etc. separated from other instances. But the business logic of all instances is the same.

Example app architecture: 

- Cockpit for system-wide administration
- End user App (multi tenancy)

# TODO

- [ ] Docs
- [ ] Use it as store?
- [ ] Make as plugin client side available too
- [ ] Types for useAppContext server side
- [ ] Make it extendable from outside for other modules which need additional data in app configuration.
- [ ] Add helper components to switch between apps.
- [ ] Add helper components to switch between tenants.

## Composables

## Components

## Server side helpers

## Usage

### Installation

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

### Configuration

```typescript
TODO
```

## Development

- Run `pnpm run dev:prepare` to generate type stubs.
- Use `pnpm run dev` to start [playground](./playground) in development mode.
