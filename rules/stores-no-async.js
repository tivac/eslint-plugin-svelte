"use strict";

module.exports = {
    meta : {
        type : "problem",

        docs : {
            description : "Svelte3 store callbacks can't be async, because they expect the returned value to be a function",
            category    : "Best Practices",
            recommended : false,
        },

        fixable : true,
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
                node    : fn,
                loc     : fn.loc,
                message : `Do not pass async functions to svelte stores.`,

                fix : (fixer) => [
                    // Removes the leading "async " from the function definition
                    fixer.removeRange([
                        tokens[0].start,
                        tokens[1].start,
                    ]),
                ],
            });
        };

        return {
            [`:expression[callee.name="readable"][arguments.length >= 2]`] : report,
            [`:expression[callee.name="writable"][arguments.length >= 2]`] : report,
            [`:expression[callee.name="derived"][arguments.length >= 2]`]  : report,
        };
    },
};
