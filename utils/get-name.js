"use strict";

const utils = require("eslint/lib/util/ast-utils.js");

module.exports = (node) =>
    utils.getStaticPropertyName(node) || node.key.name || null;
