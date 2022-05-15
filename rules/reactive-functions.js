"use strict";

module.exports = {
    meta : {
        messages : {
            noReactiveFns : `Do not create functions inside reactive statements unless absolutely necessary.`,
        },

        fixable : "code",
    },

    create(context) {
        return {
            // $: foo = () => { ... }
            [`LabeledStatement[label.name="$"] AssignmentExpression[operator="="] > :function`](node) {
                // Move upwards to include the entire label
                node = node.parent.parent.parent;

                const source = context.getSourceCode();

                return context.report({
                    node,
                    loc       : node.loc,
                    messageId : "noReactiveFns",

                    fix(fixer) {
                        const tokens = source.getTokens(node);

                        // Replace the entire reactive label with "const"
                        return fixer.replaceTextRange(
                            [
                                tokens[0].range[0],
                                tokens[1].range[1],
                            ],
                            "const"
                        );
                    },
                });
            },
        };
    },
};
