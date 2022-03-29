const rule = require("../rules/stores-initial-value.js");
const _tester = require("./_tester.js");

_tester("stores-initial-value", rule, {
    valid : [
        `const w = writable(false);`,
        `const r = readable({});`,
        `const d = derived([a, b], () => {}, false)`,
    ],

    invalid : [{
        code   : `const w = writable();`,
        output : `const w = writable(false);`,
        errors : [{ messageId : "storeDefaultValue" }],
    }, {
        code   : `const r = readable();`,
        output : `const r = readable(false);`,
        errors : [{ messageId : "storeDefaultValue" }],
    }, {
        code   : `const d = derived([a, b], () => {});`,
        output : `const d = derived([a, b], () => {}, false);`,
        errors : [{ messageId : "storeDefaultValue" }],
    }],
});
