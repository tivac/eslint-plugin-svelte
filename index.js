"use strict";

module.exports = {
    rules : {
        onupdate            : require("./rules/onupdate.js"),
        "onstate-this-refs" : require("./rules/onstate-this-refs.js"),
        "property-ordering" : require("./rules/property-ordering.js"),
    },

    configs : {
        svelte : {
            rules : {
                "@tivac/svelte/onupdate"          : "warning",
                "@tivac/svelte/onstate-this-refs" : "warning",
                "@tivac/svelte/property-ordering" : [ "error", {
                    order : [
                        // Static info
                        "immutable",
                        "namespace",
                        "tag",

                        // Components
                        "components",
                        
                        // Component data
                        "data",
                        "computed",
                        "props",
                        "store",
                        
                        // General utility methods
                        "actions",
                        "events",
                        "helpers",
                        "methods",
                        "transitions",
                        
                        // Lifecycle Events
                        "setup",
                        "preload",
                        "oncreate",
                        "onrender",
                        "ondestroy",
                        "onteardown",
                        "onstate",
                        "onupdate",
                    ],
                }],
            },
        },
    },
};
