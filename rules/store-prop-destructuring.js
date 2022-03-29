"use strict";

module.exports = {
    meta : {
        docs : {
            description : "Destructure properties from stores containing objects for better redraw perf",
            category    : "Best Practices",
            recommended : false,
        },
        messages : {
            useDestructuring : "Destructure \\{{prop}} from store \\{{store}} for better change tracking",
        },
    },

    create(context) {
        return {
            // {$foo.bar + baz}
            // should be
            // $: ({ bar } = $foo);
            // {bar + baz}
            [`MemberExpression[object.name=/\$/][property.name]`](node) {
                return context.report({
                    node,
                    messageId : "useDestructuring",
                    data      : {
                        store : node.object.name,
                        prop  : node.property.name,
                    },
                });
            },
        };
    },
};


