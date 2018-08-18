"use strict";

const property = `ExportDefaultDeclaration Property[key.name="onupdate"]`;
const subscription = `ExportDefaultDeclaration CallExpression[arguments.0.value="update"] [object.type="ThisExpression"][property.name="on"]`;

module.exports = {
    meta : {
        docs : {
            description : `Warn about using onupdate or this.on("update"). You probably want onstate instead`,
            category    : "Best Practices",
            recommended : false,
        },
        schema   : [],
        fixable  : true,
        messages : {
            property     : `Found onupdate usage. Consider onstate instead`,
            subscription : `Found "update" event usage. Consider "state" event instead`,
        },
    },

    create(context) {
        return {
            [property](node) {
                context.report({
                    node,
                    messageId : "property",
                    fix       : (fixer) => fixer.replaceText(node, "onstate"),
                });
            },
            
            [subscription](node) {
                context.report({
                    node      : node.parent,
                    messageId : "subscription",
                    fix       : (fixer) => fixer.replaceText(node.parent.arguments[0], `"state"`),
                });
            },
        };
    },
};
