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

                        // Components
                        "components",
                        
                        // Component data
                        "data",
                        "computed",
                        
                        // General utility methods
                        "actions",
                        "helpers",
                        "methods",
                        
                        // Lifecycle Events
                        "setup",
                        "oncreate",
                        "ondestroy",
                        "onstate",
                        "onupdate",
                    ]
                }]
            }
        }
    }
};
