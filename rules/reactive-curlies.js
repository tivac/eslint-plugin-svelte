"use strict";

module.exports = {
    meta : {
        messages : {
            unnecessaryCurlies : `Do not wrap reactive statements in curly braces unless necessary.`,
        },
        
        fixable : "code",
    },

    create(context) {
        const report = (node) => {
            // Move upwards to include the entire label
            const { parent } = node;

            const source = context.getSourceCode();

            return context.report({
                node      : parent,
                loc       : parent.loc,
                messageId : "unnecessaryCurlies",
                
                fix(fixer) {
                    const tokens = source.getTokens(node);

                    // Remove everything up to the second token, and the entire last token since
                    // those are known to be "{" and "}"
                    return [
                        fixer.removeRange([
                            tokens[0].range[0],
                            tokens[1].range[0],
                        ]),
                        
                        fixer.removeRange([
                            tokens[tokens.length - 2].range[1],
                            tokens[tokens.length - 1].range[1],
                        ]),
                    ];
                },
            });
        };

        return {
            // $: { foo = info; }
            [`LabeledStatement[label.name="$"] > BlockStatement[body.length=1]`] : report,
        };
    },
};
