"use strict";

module.exports = {
    meta : {
        docs : {
            description : "Destructure properties from stores containing objects for better redraw perf",
            category    : "Best Practices",
            recommended : false,
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
                    message : `Destructure properties from stores that hold an object for more granular redraw perf.`,
                });
            },
        };
    },
};
