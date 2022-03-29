"use strict";

const labeledStatementBase = `LabeledStatement[label.name="$"] > ExpressionStatement > AssignmentExpression`;

module.exports = {
    meta : {
        docs : {
            description : "Assigning to literal values inside reactive statements is bad, don't do it",
            category    : "Best Practices",
            recommended : false,
        },

        messages : {
            noReactiveLiterals : `Do not assign literal values inside reactive statements unless absolutely necessary.`,
        },

        fixable : "code",
    },

    create(context) {
        const warn = (node) => {
            // Move upwards to include the entire label
            node = node.parent.parent;

            const source = context.getSourceCode();

            return context.report({
                node,
                loc       : node.loc,
                messageId : "noReactiveLiterals",

                fix(fixer) {
                    const tokens = source.getTokens(node);

                    // Replace the entire reactive label with "let"
                    return fixer.replaceTextRange(
                        [
                            tokens[0].range[0],
                            tokens[1].range[1],
                        ],
                        "let"
                    );
                },
            });
        };

        return {
            // $: foo = "foo";
            // $: foo = 1;
            [`${labeledStatementBase}[right.type="Literal"]`] : warn,

            // $: foo = [];
            [`${labeledStatementBase}[right.type="ArrayExpression"][right.elements.length=0]`] : warn,
            
            // $: foo = {};
            [`${labeledStatementBase}[right.type="ObjectExpression"][right.properties.length=0]`] : warn,
        };
    },
};
