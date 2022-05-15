---
"@tivac/eslint-plugin-svelte": major
---

`stores-no-async` only suggests

BREAKING CHANGE:

`stores-no-async` rule will no longer auto-fix and remove the leading `async` keyword, instead it will make a suggestion to that effect. The previous behavior wasn't safe because it didn't try to rewrite any `await` usage within the store method.
