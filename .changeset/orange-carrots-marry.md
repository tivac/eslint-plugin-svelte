---
"@tivac/eslint-plugin-svelte": minor
---

Added derived-inputs-outputs rule

Checks that the input stores to a `derived()` have the expected names when used as values. Each value should match the local variable name of the input store, and have a `$` prefix added like you would use in a svelte component.

```js
// Valid
derived(a, ($a) => {});
derived(a, ($a, set) => {});
derived([ a, b ], ([ $a, $b ]) => {});

// Invalid
derived(a, (value) => {});
derived(a, (foo, set) => {});
derived([ a, b ], ([ one, two ]) => {});
```
