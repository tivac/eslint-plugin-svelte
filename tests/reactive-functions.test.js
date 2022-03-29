const rule = require("../rules/reactive-functions.js");
const _tester = require("./_tester.js");

_tester("reactive-functions", rule, {
    valid : [
        `const foo = () => {}`,
        `function foo() { }`,
    ],

    invalid : [{
        code   : `$: foo = () => {};`,
        output : `const foo = () => {};`,
        errors : [{ messageId : "noReactiveFns" }],
    }],
});
