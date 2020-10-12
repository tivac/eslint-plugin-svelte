# @tivac/eslint-plugin-svelte

## Installing the plugin

Install the plugin and its dependencies via npm.

```bash
$> npm install --save-dev @tivac/eslint-plugin-svelte
```

## Using the plugin

Add the plugin's name to the `plugin` section of your ESLint config.

```json
{
    "plugins" : [
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

- `reactive-curlies`, don't add `{ ... }` if there's only a single statement
- `reactive-destructuring`, prefer destructuring for reactive reassignments
- `reactive-functions`, don't define functions inside reactive statements
- `reactive-literals`, don't assign literals in a reactive statement
- `stores-initial-value`, always give svelte stores a default value
- `stores-no-async`, don't use `async`/`await` inside svelte stores because it causes issues with the auto-unsubscribing features
