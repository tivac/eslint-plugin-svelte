"use strict";

const utils = require("eslint/lib/ast-utils.js");

function getName(node) {
    return utils.getStaticPropertyName(node) || node.key.name || null;
}

function compareOrder(order, prev, curr) {
    const pi = order.indexOf(prev);
    let ci = order.indexOf(curr);
    
    if(ci === -1) {
        ci = Infinity;
    }

    return pi < ci;
}

module.exports = {
    meta : {
        docs : {
            description : "Enforce ordering of properties in svelte components",
            category    : "Best Practices",
            recommended : false,
        },
        schema : [
            {
                type : "object",
                
                properties : {
                    order : {
                        type  : "array",
                        items : {
                            type : "string",
                            enum : [
                                "actions",
                                "components",
                                "computed",
                                "data",
                                "helpers",
                                "immutable",
                                "methods",
                                "namespace",
                                "oncreate",
                                "ondestroy",
                                "onstate",
                                "onupdate",
                                "setup",
                            ],
                        },
                    },
                },

                additionalProperties : false,
            }
        ]
    },

    create(context) {
        const [ options = {} ] = context.options;
        const { order } = options;

        let stack;

        if(!order) {
            return {};
        }

        return {
            "ExportDefaultDeclaration > ObjectExpression"() {
                stack = {
                    prev : null
                };
            },

            "ExportDefaultDeclaration > ObjectExpression:exit"() {
                stack = false;
            },

            "ExportDefaultDeclaration > ObjectExpression > Property"(node) {
                const { prev } = stack;
                const name = getName(node);

                stack.prev = name || prev;

                if(!prev || !name) {
                    return;
                }

                const valid = compareOrder(order, prev, name);

                if(valid) {
                    return;
                }

                context.report({
                    node,
                    loc     : node.key.loc,
                    message : "Expected object keys to ordered. {{name}} should come before {{prev}}.",
                    data    : {
                        name,
                        prev
                    }
                });
            }
        };
    }
};