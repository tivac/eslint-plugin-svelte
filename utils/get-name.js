"use strict";

let utils;

// I don't feel good about this, but I also don't want to just copy it soooooooo ¯\_(ಠ_ಠ)_/¯
try {
    // eslint@6
    utils = require("eslint/lib/rules/utils/ast-utils.js");
} catch(e) {
    // eslint@5
    utils = require("eslint/lib/util/ast-utils.js");
}

module.exports = (node) =>
    utils.getStaticPropertyName(node) || node.key.name || null;
