"use strict";

module.exports = {
    meta : {
        type : "suggestion",

        messages : {
            noAsyncStores : `Do not pass async functions to svelte stores.`,
        },

        hasSuggestions : true,
    },

    create(context) {
        const report = (node) => {
            const { arguments: args } = node;
            const [ , fn ] = args;

            if(!fn.async) {
                return;
            }

            const source = context.getSourceCode();
            const tokens = source.getTokens(fn);

            context.report({
                node      : fn,
                loc       : fn.loc,
                messageId : "noAsyncStores",

                // Remove the leading "async " from the function definition
                suggest : [{
                    desc : "Remove the async and use Promise methods instead",
                    fix  : (fixer) => fixer.removeRange([
                        tokens[0].range[0],
                        tokens[1].range[0],
                    ]),
                }],
            });
        };

        return {
            [`:expression[callee.name="readable"][arguments.length >= 2]`] : report,
            [`:expression[callee.name="writable"][arguments.length >= 2]`] : report,
            [`:expression[callee.name="derived"][arguments.length >= 2]`]  : report,
        };
    },
};
