# @tivac/eslint-plugin-svelte

## Installing the plugin

Install the plugin and its dependencies via npm.

```bash
$> npm install --save-dev @tivac/eslint-plugin-svelte
```

## Using the plugin

Add one of the shared configs provided by this plugin to the `extends` section in your ESLint config.

```json
{
    "extends" : [
        // Only enables the plugin, no rule config
        "plugin:@tivac/svelte/base"

        // or

        // Enables the plugin and all rules
        "plugin:@tivac/svelte/recommended"
    ]
}
```

## Rules

- `derived-inputs-outputs`, input & value names of `derived()` should match
- `reactive-curlies`, don't add `{ ... }` if there's only a single statement
- `reactive-destructuring`, prefer destructuring for reactive reassignments
- `reactive-functions`, don't define functions inside reactive statements
- `reactive-literals`, don't assign literals in a reactive statement
- `store-prop-destructuring`, don't access store values as `$foo.bar` but instead destructure them `$: ({ bar } = $foo);` for more granular redraws
- `stores-initial-value`, always give svelte stores a default value
- `stores-no-async`, don't use `async`/`await` inside svelte stores because it causes issues with the auto-unsubscribing features
