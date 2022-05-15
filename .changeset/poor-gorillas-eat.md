---
"@tivac/eslint-plugin-svelte": major
---

Renamed the share config to "recommended"

This better matches the ESLint naming convention and also looks a bit more sane in the config.

To update your ESLint config should require the following change:

```diff
{
    "extends" : [
        "eslint:recommended",
-        "plugin:@tivac/svelte/svelte"
+        "plugin:@tivac/svelte/recommended"
    ]
}
```
