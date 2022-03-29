const rule = require("../rules/reactive-literals.js");
const _tester = require("./_tester.js");

_tester("reactive-literals", rule, {
    valid : [
        `let foo = 1`,
        `let foo = []`,
        `let foo = {}`,
    ],

    invalid : [{
        code   : `$: foo = "foo";`,
        output : `let foo = "foo";`,
        errors : [{ messageId : "noReactiveLiterals" }],
    }, {
        code   : `$: foo = [];`,
        output : `let foo = [];`,
        errors : [{ messageId : "noReactiveLiterals" }],
    }, {
        code   : `$: foo = {};`,
        output : `let foo = {};`,
        errors : [{ messageId : "noReactiveLiterals" }],
    }],
});
