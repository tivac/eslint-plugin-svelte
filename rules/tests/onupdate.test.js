"use strict";

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
        `export default { onstate() { } };`,
        `export default { oncreate() { this.on("state", () => { }); } };`,
    ],
    
    invalid : [
        {
            code   : `export default { onupdate };`,
            output : `export default { onstate };`,
            errors : [{
                message : "Found onupdate usage. Consider onstate instead",
            }],
        },
        {
            code   : `export default { oncreate() { this.on("update", () => { }); } };`,
            output : `export default { oncreate() { this.on("state", () => { }); } };`,
            errors : [{
                message : `Found "update" event usage. Consider "state" event instead`,
            }],
        },
    ],
});
