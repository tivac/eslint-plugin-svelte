"use strict";

const labeledStatementBase = `LabeledStatement[label.name="$"] > ExpressionStatement > AssignmentExpression`;

module.exports = {
    meta : {
        type : "problem",

        docs : {
            description : "Prefer destructuring, even in reactive statements",
            category    : "Best Practices",
            recommended : false,
        },

        fixable : true,
    },

    create(context) {
        return {
            // Find $: info = foo.info
            // Fix  $: ({ info } = foo);
            [`${labeledStatementBase}[right.type="MemberExpression"]`](node) {
                const { left, right } = node;

                // Already destructured
                if(left.type === "ObjectPattern") {
                    return;
                }

                const { name : prop } = left;

                if(right.property.name !== prop) {
                    return;
                }

                const source = context.getSourceCode();
                const lTokens = source.getTokens(left);
                const rTokens = source.getTokens(right);

                return context.report({
                    node,
                    loc     : node.loc,
                    message : `Prefer destructuring in reactive statements`,

                    fix : (fixer) => [
                        fixer.insertTextBefore(lTokens[0], "({ "),
                        fixer.insertTextAfter(lTokens[0], " }"),
                        fixer.replaceTextRange([
                            rTokens[rTokens.length - 2].start,
                            rTokens[rTokens.length - 1].end,
                        ], ""),
                        fixer.insertTextAfter(rTokens[rTokens.length - 1], ")"),
                    ],
                });
            },
        };
    },
};
