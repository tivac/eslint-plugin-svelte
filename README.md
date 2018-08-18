eslint-plugin-svelte
====================

## Installing the plugin

Install the plugin and its dependencies via npm.

```bash
$> npm install --save-dev @tivac/eslint-plugin-svelte eslint-plugin-html
```

## Using the plugin

Add the plugin's name to the `plugin` section of your ESLint config. You'll also need to use `eslint-plugin-html` to get anything interesting to happen.

```json
{
    "plugins" : [
        "html",
        "@tivac/svelte"
    ]
}
```

### Shared config

This plugin provides a shared config named `svelte` which can be used by adding it to the `extends` section in your ESLint config.

```json
{
    "extends" : [
        "eslint:recommended",
        "plugin:@tivac/svelte/svelte"
    ]
}
```

## Rules

- [`onstate-this-refs`](docs/rules.md#onstate-this-refs)
- [`onupdate`](docs/rules.md#onupdate)
- [`property-ordering`](docs/rules.md#property-ordering)
