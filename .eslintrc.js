"use strict";

module.exports = {
    extends : [
        "@tivac",
    ],

    parserOptions: {
        ecmaVersion: 6,
    },

    env: {
      node : true,
      jest : true,
    },

    plugins : [
        "jest",
    ],

    rules : {
        "jest/consistent-test-it"       : "error",
        "jest/lowercase-name"           : "error",
        "jest/no-disabled-tests"        : "warn",
        "jest/no-focused-tests"         : "error",
        "jest/no-hooks"                 : "off",
        "jest/no-identical-title"       : "error",
        "jest/no-jest-import"           : "error",
        "jest/no-large-snapshots"       : "error",
        "jest/no-test-prefixes"         : "error",
        "jest/prefer-to-have-length"    : "error",
        "jest/prefer-to-be-null"        : "error",
        "jest/prefer-to-be-undefined"   : "error",
        "jest/prefer-expect-assertions" : "off",
        "jest/valid-describe"           : "error",
        "jest/valid-expect"             : "error",
        "jest/valid-expect-in-promise"  : "error",
    },
}
