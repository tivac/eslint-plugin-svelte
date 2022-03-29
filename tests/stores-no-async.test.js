const rule = require("../rules/stores-no-async.js");
const _tester = require("./_tester.js");

_tester("stores-no-async", rule, {
    valid : [
        `const w = writable(false, () => {});`,
        `const r = readable(false, () => {});`,
        `const d = derived([a, b], () => {}, false)`,
    ],

    invalid : [{
        code   : `const w = writable(false, async () => {});`,
        output : `const w = writable(false, () => {});`,
        errors : [{ messageId : "noAsyncStores" }],
    }, {
        code   : `const r = readable(false, async () => {});`,
        output : `const r = readable(false, () => {});`,
        errors : [{ messageId : "noAsyncStores" }],
    }, {
        code   : `const d = derived([a, b], async () => {}, false);`,
        output : `const d = derived([a, b], () => {}, false);`,
        errors : [{ messageId : "noAsyncStores" }],
    }],
});
