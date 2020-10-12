"use strict";

module.exports = {
    rules : {
        "reactive-curlies"       : require("./rules/reactive-curlies.js"),
        "reactive-destructuring" : require("./rules/reactive-destructuring.js"),
        "reactive-functions"     : require("./rules/reactive-functions.js"),
        "reactive-literals"      : require("./rules/reactive-literals.js"),
        "stores-initial-value"   : require("./rules/stores-initial-value.js"),
        "stores-no-async"        : require("./rules/stores-no-async.js"),
    },

    configs : {
        svelte : {
            rules : {
                "@tivac/svelte/reactive-curlies"       : "warn",
                "@tivac/svelte/reactive-destructuring" : "warn",
                "@tivac/svelte/reactive-functions"     : "error",
                "@tivac/svelte/reactive-literals"      : "warn",
                "@tivac/svelte/stores-initial-value"   : "warn",
                "@tivac/svelte/stores-no-async"        : "error",
            },
        },
    },
};
