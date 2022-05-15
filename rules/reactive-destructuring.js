"use strict";

const labeledStatementBase = `LabeledStatement[label.name="$"] > ExpressionStatement > AssignmentExpression`;

module.exports = {
    meta : {
        type : "problem",

        messages : {
            useDestructuring : `Prefer destructuring in reactive statements`,
        },

        fixable : "code",
    },

    create(context) {
        return {
            // Find $: info = foo.info
            // Fix  $: ({ info } = foo);
            [`${labeledStatementBase}[left.type!="ObjectPattern"][right.type="MemberExpression"]`](node) {
                const { left, right } = node;

                const prop = right.property.name;
                const { name : target } = left;
              
                const source = context.getSourceCode();
                const lTokens = source.getTokens(left);
                const rTokens = source.getTokens(right);
                const matched = prop === target;

                context.report({
                    node,
                    loc       : node.loc,
                    messageId : "useDestructuring",

                    fix : (fixer) => [
                        fixer.insertTextBefore(lTokens[0], `({ ${!matched ? `${prop}: ` : ""}`),
                        fixer.insertTextAfter(lTokens[0], ` }`),
                        fixer.replaceTextRange([
                            rTokens[rTokens.length - 2].range[0],
                            rTokens[rTokens.length - 1].range[1],
                        ], ""),
                        fixer.insertTextAfter(rTokens[rTokens.length - 1], ")"),
                    ],
                });
            },
        };
    },
};
