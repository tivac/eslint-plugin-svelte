"use strict";

module.exports = {
    meta : {
        type : "problem",

        docs : {
            description : "Svelte3 stores should always have a default value (ideally false) for destructuring purposes",
            category    : "Best Practices",
            recommended : false,
        },

        messages : {
            storeDefaultValue : `Always set a default value of "false" for svelte stores.`,
        },

        fixable : "code",
    },

    create(context) {
        const report = (node) => {
            const source = context.getSourceCode();
            const tokens = source.getTokens(node);

            return context.report({
                node,
                loc       : node.loc,
                messageId : "storeDefaultValue",
                fix       : (fixer) => [
                    // adds a "false" argument before the last ")"
                    tokens[0].value === "derived" ?
                        fixer.insertTextBefore(tokens[tokens.length - 1], ", false") :
                        fixer.insertTextBefore(tokens[tokens.length - 1], "false"),
                ],
            });
        };

        return {
            [`:expression[callee.name="writable"][arguments.length=0]`]  : report,
            [`:expression[callee.name="readable"][arguments.length=0]`]  : report,
            [`:expression[callee.name="derived"][arguments.length < 3]`] : report,
        };
    },
};
