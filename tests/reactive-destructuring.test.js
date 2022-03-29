const rule = require("../rules/reactive-destructuring.js");
const _tester = require("./_tester.js");

_tester("reactive-destructuring", rule, {
    valid : [
        `$: ({ foo } = info)`,
    ],

    invalid : [{
        code   : `$: foo = info.foo;`,
        output : `$: ({ foo } = info);`,
        errors : [{ messageId : "useDestructuring" }],
    }, {
        code   : `$: bar = info.foo;`,
        output : `$: ({ foo: bar } = info);`,
        errors : [{ messageId : "useDestructuring" }],
    }],
});
