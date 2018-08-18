"use strict";

const dedent = require("dedent");
const { RuleTester } = require("eslint");

const rule = require("../onstate-this-refs.js");

const ruleTester = new RuleTester({
    parserOptions : {
        ecmaVersion : 2015,
        sourceType  : "module",
    },
});

ruleTester.run("onstate-this-refs", rule, {
    valid : [
        dedent(`
            export default {
                onupdate() {
                    this.refs.foo = "a";
                }
            };
        `),
        dedent(`
            export default {
                oncreate() {
                    this.on("update", () => {
                        this.refs.foo = "a";
                    });
                }
            };
        `),
    ],
    
    invalid : [
        {
            code : dedent(`
                export default {
                    onstate() {
                        this.refs.foo = "a";
                    }
                };
            `),
            errors : [{
                messageId : "warning",
            }],
        },
        {
            code : dedent(`
                export default {
                    oncreate() {
                        this.on("state", () => {
                            this.refs.foo = "a";
                        });
                    }
                };
            `),
            errors : [{
                messageId : "warning",
            }],
        },
    ],
});
