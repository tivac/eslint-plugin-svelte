"use strict";

const { RuleTester } = require("eslint");
const dedent = require("dedent");

const rule = require("../property-ordering.js");

const ruleTester = new RuleTester({
    parserOptions : {
        ecmaVersion : 2015,
        sourceType  : "module"
    }
});

ruleTester.run("property-ordering", rule, {
    valid : [
        // {
        //     code : dedent(`
        //         export default { immutable : true, data : () => {} };
        //     `),

        //     options : [{
        //         order : [
        //             "immutable",
        //             "data",
        //         ]
        //     }]
        // },
        
        {
            code : dedent(`
                export default { immutable : true, data : () => { return { css }; } };
            `),

            options : [{
                order : [
                    "immutable",
                    "data",
                ]
            }]
        },

        // {
        //     code : dedent(`
        //         export default { immutable : true, data : () => {} };
        //     `),

        //     options : [{
        //         order : [
        //             "immutable",
        //             "namespace",
        //             "components",
        //             "data",
        //         ]
        //     }]
        // }
    ],

    invalid : [
        // {
        //     code    : dedent(`export default { immutable : true, data : () => {} }; `),
        //     options : [{
        //         order : [
        //             "data",
        //             "immutable"
        //         ]
        //     }],
        //     errors : [{
        //         message : "Expected object keys to ordered. data should come before immutable."
        //     }]
        // },
        
        {
            code    : dedent(`export default { immutable : true, data : () => { return { data }; } }; `),
            options : [{
                order : [
                    "data",
                    "immutable"
                ]
            }],
            errors : [{
                message : "Expected object keys to ordered. data should come before immutable."
            }]
        },
    ]
});
