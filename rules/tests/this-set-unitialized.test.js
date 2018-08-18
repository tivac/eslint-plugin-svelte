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

ruleTester.run("this-set-uninitialized", rule, {
    valid : [
        dedent(`
            export default {
                data() {
                    return {
                        fooga : 0
                    };
                },

                oncreate() {
                    this.set({
                        fooga : 1,
                    });
                }
            };
        `),
        dedent(`
            export default {
                data : () => ({
                    fooga : 0
                }),

                oncreate() {
                    this.set({
                        fooga : 1,
                    });
                }
            };
        `),
    ],
    
    invalid : [
        {
            code : dedent(`
                export default {
                    data() {
                        return {
                            fooga : 0
                        };
                    },

                    oncreate() {
                        this.set({
                            fooga : 1,
                            booga : 2,
                        });
                    }
                };
            `),
            errors : [{
                messageId : "uninitialized",
            }],
        },
        {
            code : dedent(`
            export default {
                    data : () => ({
                        fooga : 0
                    }),

                    oncreate() {
                        this.set({
                            fooga : 1,
                            booga : 2,
                        });
                    }
                };
            `),
            errors : [{
                messageId : "uninitialized",
            }],
        },
    ],
});
