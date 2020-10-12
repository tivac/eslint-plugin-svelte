"use strict";

module.exports = {
    meta : {
        docs : {
            description : "Creating functions inside reactive statements is bad, don't do it",
            category    : "Best Practices",
            recommended : false,
        },

        fixable : true,
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
                    loc     : node.loc,
                    message : `Do not create functions inside reactive statements unless absolutely necessary.`,

                    fix(fixer) {
                        const tokens = source.getTokens(node);

                        // Replace the entire reactive label with "const"
                        return fixer.replaceTextRange(
                            [
                                tokens[0].start,
                                tokens[1].end,
                            ],
                            "const"
                        );
                    },
                });
            },
        };
    },
};
