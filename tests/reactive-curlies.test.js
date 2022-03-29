const rule = require("../rules/reactive-curlies.js");
const _tester = require("./_tester.js");

_tester("reactive-curlies", rule, {
    valid : [
        `$: foo = info;`,
    ],

    invalid : [{
        code   : `$: { foo = info; }`,
        output : `$: foo = info;`,
        errors : [{ messageId : "unnecessaryCurlies" }],
    }],
});
