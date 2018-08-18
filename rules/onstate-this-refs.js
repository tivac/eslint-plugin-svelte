"use strict";

const refs = `MemberExpression[object.type=ThisExpression][property.name="refs"]`;
const property = `ExportDefaultDeclaration Property[key.name="onstate"] ${refs}`;
const subscription = `ExportDefaultDeclaration CallExpression[arguments.0.value="state"] ${refs}`;

module.exports = {
    meta : {
        docs : {
            description : `Warn about using this.refs in a state update`,
            category    : "Best Practices",
            recommended : false,
        },
        
        schema : [],

        messages : {
            warning : `Avoid using this.refs in onstate or this.on("state"), the DOM isn't updated yet.`,
        },
    },

    create(context) {
        const handler = (node) => {
            context.report({
                node,
                messageId : "warning",
            });
        };

        return {
            [property]     : handler,
            [subscription] : handler,
        };
    },
};
