const rule = require("../rules/derived-inputs-outputs.js");
const _tester = require("./_tester.js");

_tester("derived-inputs-outputs", rule, {
    valid : [
        `derived(a, ($a) => {})`,
        `derived(a, ($a, set) => {})`,
        `derived([ a, b ], ([ $a, $b ]) => {})`,
    ],

    invalid : [{
        code   : `derived(a, (b) => {});`,
        errors : [{
            suggestions : [{
                output : `derived(a, ($a) => {});`,
            }],
        }],
    }, {
        code   : `derived(a, (b, set) => {});`,
        errors : [{
            suggestions : [{
                output : `derived(a, ($a, set) => {});`,
            }],
        }],
    }, {
        code   : `derived([ a, b ], ([ one, two ]) => {})`,
        errors : [{
            suggestions : [{
                output : `derived([ a, b ], ([ $a, two ]) => {})`,
            }],
        }, {
            suggestions : [{
                output : `derived([ a, b ], ([ one, $b ]) => {})`,
            }],
        }],
    }],
});
