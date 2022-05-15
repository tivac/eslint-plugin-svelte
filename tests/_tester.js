const { RuleTester } = require("eslint");
const { suite } = require("uvu");

module.exports = (name, rule, tests) => {
    const test = suite(name);

    RuleTester.it = test;
    RuleTester.itOnly = test.only;

    const ruleTester = new RuleTester({
        parserOptions : {
            ecmaVersion : 2019,
            sourceType  : "module",
        },

        env : {
            es6     : true,
            browser : true,
        },
    });

    ruleTester.run(name, rule, tests);

    test.run();
};
