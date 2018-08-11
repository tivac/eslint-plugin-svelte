"use strict";

const getName = require("../utils/get-name.js");

const subscription = `ExportDefaultDeclaration CallExpression[arguments.0.value="update"] [object.type="ThisExpression"][property.name="on"]`;

module.exports = {
    meta : {
        docs : {
            description : `Warn about using onupdate or this.on("update"). You probably want onstate instead`,
            category    : "Best Practices",
            recommended : false,
        },
        schema  : [],
        fixable : true,
    },

    create(context) {
        return {
            "ExportDefaultDeclaration > ObjectExpression > Property"(node) {
                const name = getName(node);

                if(name !== "onupdate") {
                    return;
                }

                context.report({
                    node,
                    message : `Found onupdate usage. Consider onstate instead`,
                    fix     : (fixer) => fixer.replaceText(node, "onstate"),
                });
            },
            
            [subscription](node) {
                context.report({
                    node    : node.parent,
                    message : `Found "update" event usage. Consider "state" event instead`,
                    fix     : (fixer) => fixer.replaceText(node.parent.arguments[0], `"state"`),
                });
            },
        };
    },
};
