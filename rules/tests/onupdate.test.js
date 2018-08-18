"use strict";

const dedent = require("dedent");
const { RuleTester } = require("eslint");

const rule = require("../onupdate.js");

const ruleTester = new RuleTester({
    parserOptions : {
        ecmaVersion : 2015,
        sourceType  : "module",
    },
});

ruleTester.run("onupdate", rule, {
    valid : [
        dedent(`
            export default {
                onstate() { }
            };
        `),
        dedent(`
            export default {
                oncreate() {
                    this.on("state", () => { });
                }
            };
        `),
    ],
    
    invalid : [
        {
            code : dedent(`
                export default {
                    onupdate
                };
            `),
            output : dedent(`
                export default {
                    onstate
                };
            `),
            errors : [{
                messageId : "property",
            }],
        },
        {
            code : dedent(`
                export default {
                    oncreate() {
                        this.on("update", () => { });
                    }
                };
            `),
            output : dedent(`
                export default {
                    oncreate() {
                        this.on("state", () => { });
                    }
                };
            `),
            errors : [{
                messageId : "subscription",
            }],
        },
    ],
});
