# Changelog

## 3.0.1

### Patch Changes

- 3babc1b: Corrected a misspelled rule name in `@tivac/svelte/recommended`.

## 3.0.0

### Major Changes

- 7a9bf17: `stores-no-async` only suggests

  BREAKING CHANGE:

  `stores-no-async` rule will no longer auto-fix and remove the leading `async` keyword, instead it will make a suggestion to that effect. The previous behavior wasn't safe because it didn't try to rewrite any `await` usage within the store method.

- f6557ab: Renamed the share config to "recommended"

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

### Minor Changes

- e61ffd9: Added derived-inputs-outputs rule

  Checks that the input stores to a `derived()` have the expected names when used as values. Each value should match the local variable name of the input store, and have a `# Changelog prefix added like you would use in a svelte component.

  ```js
  // Valid
  derived(a, $a => {});
  derived(a, ($a, set) => {});
  derived([a, b], ([$a, $b]) => {});

  // Invalid
  derived(a, value => {});
  derived(a, (foo, set) => {});
  derived([a, b], ([one, two]) => {});
  ```

## [2.2.0](https://github.com/tivac/eslint-plugin-svelte/compare/eslint-plugin-svelte-v2.1.0...eslint-plugin-svelte-v2.2.0) (2022-03-29)

### Miscellaneous Chores

- release 2.2.0 ([e67c1d4](https://github.com/tivac/eslint-plugin-svelte/commit/e67c1d42079b99630e0292d50caf8652990a156a))

## [2.1.0](https://github.com/tivac/eslint-plugin-svelte/compare/eslint-plugin-svelte-v2.0.0...eslint-plugin-svelte-v2.1.0) (2022-03-29)

### Features

- store-prop-destructuring ([#11](https://github.com/tivac/eslint-plugin-svelte/issues/11)) ([c301286](https://github.com/tivac/eslint-plugin-svelte/commit/c30128666fd04c470a1b9081ee8b9c7235c5f186))
