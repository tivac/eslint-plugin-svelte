"use strict";

module.exports = {
    rules : {
        "property-ordering" : require("./rules/property-ordering.js")
    },

    configs : {
        svelte : {
            rules : {
                "@tivac/svelte/property-ordering" : [ 2, {
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
                    ]
                }]
            }
        }
    }
};
