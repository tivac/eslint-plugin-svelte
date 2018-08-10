"use strict";

module.exports = {
    projects : [
        {
            displayName : "tests",
        },
        {
            runner      : "jest-runner-eslint",
            displayName : "lint",
            testMatch   : [ "<rootDir>/rules/**/*.js" ],
        },
    ],
};
