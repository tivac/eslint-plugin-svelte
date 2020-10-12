"use strict";

module.exports = {
    meta : {
        docs : {
            description : "Unnecessary curly braces around reactive statements are unnecessary, don't do it!",
            category    : "Best Practices",
            recommended : false,
        },
        
        fixable : true,
    },

    create(context) {
        const report = (node) => {
            // Move upwards to include the entire label
            const { parent } = node;

            const source = context.getSourceCode();

            return context.report({
                node    : parent,
                loc     : parent.loc,
                message : `Do not wrap reactive statements in curly braces unless necessary.`,
                
                fix(fixer) {
                    const tokens = source.getTokens(node);

                    // Remove everything up to the first token, and the entire last token since
                    // those are known to be "{" and "}"
                    return [
                        fixer.removeRange([
                            tokens[0].start,
                            tokens[1].start - 1,
                        ]),
                        
                        fixer.removeRange([
                            tokens[tokens.length - 1].start,
                            tokens[tokens.length - 1].end,
                        ]),
                    ];
                },
            });
        };

        return {
            [`LabeledStatement[label.name="$"] > BlockStatement[body.length=1]`] : report,
        };
    },
};
