eslint-plugin-svelte
====================

:warning: Eventually this will be a collection of svelte-oriented ESLint rules. :warning:

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

- [`property-ordering`](#property-ordering)

## Rule Details

### `property-ordering`

This rule checks that the properties of a Svelte component occur in the correct order.

#### Examples

Examples of **incorrect** code for this rule:

```js
/* eslint @tivac/svelte/property-ordering: [ "error", { order : [ "data", "computed", "oncreate" ] } ] */
/* eslint-env es6 */

export default {
    computed : { ... },
    data : () => { ... },
};

export default {
    oncreate() { ... },
    computed : { ... },
    data : () => { ... },
};
```

Examples of **correct** code for this rule:

```js
/* eslint @tivac/svelte/property-ordering: [ "error", { order : [ "data", "computed", "oncreate" ] } ] */
/* eslint-env es6 */

export default {
    data : () => { ... },
    computed : { ... },
};

export default {
    data : () => { ... },
    computed : { ... },
    oncreate() { ... },
};
```

#### Options

```js
{
    "@tivac/svelte/property-ordering" : [ "error", { order : [ "data", "computed" ] } ]
}
```

The 1st option is an object which has 1 property

- `order` - An array of possible Svelte property names in the order you expect them to appear.
    - `actions`
    - `components`
    - `computed`
    - `data`
    - `events`
    - `helpers`
    - `immutable`
    - `methods`
    - `namespace`
    - `oncreate`
    - `ondestroy`
    - `onrender`
    - `onstate`
    - `onteardown`
    - `onupdate`
    - `preload`
    - `props`
    - `setup`
    - `store`
    - `tag`
    - `transitions`

Any property names which are not in `order` will be ignored, so it's better to be explicit when configuring.
