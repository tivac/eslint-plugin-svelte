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
        errors : [{
            suggestions : [{
                output : `const w = writable(false, () => {});`,
            }],
        }],
    }, {
        code   : `const r = readable(false, async () => {});`,
        errors : [{
            suggestions : [{
                output : `const r = readable(false, () => {});`,
            }],
        }],
    }, {
        code   : `const d = derived([a, b], async () => {}, false);`,
        errors : [{
            suggestions : [{
                output : `const d = derived([a, b], () => {}, false);`,
            }],
        }],
    }],
});
