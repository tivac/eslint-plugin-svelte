const rule = require("../rules/store-prop-destructuring.js");
const _tester = require("./_tester.js");

_tester("store-prop-destructuring", rule, {
    valid : [{
        code : `
            $: ({ bar } = $foo);
            $: baz = bar;
        `,
    }],

    invalid : [{
        code : `
            $: baz = $foo.bar;
        `,
        errors : [{ messageId : "useDestructuring", data : { store : "$foo", prop : "bar" } }],
    }],
});
