"use strict";

module.exports = {
    meta : {
        type : "suggestion",

        messages : {
            storeNames : `Derived store value names should match the inputs, got {{actual}} but expected {{expected}}`,
            suggestion : `Rename the value to {{expected}} to match the input store`,
        },

        hasSuggestions : true,
    },

    create(context) {
        let source;
      
        const check = (sources, values) => {
            sources.forEach((input, idx) => {
                const expected = `$${input.name}`;
                const actual = values[idx].name;
              
                if(expected === actual) {
                    return;
                }
            
                if(!source) {
                    source = context.getSourceCode();
                }
            
                const tokens = source.getTokens(values[idx]);
            
                context.report({
                    node      : values[idx],
                    messageId : "storeNames",
                    data      : {
                        expected,
                        actual,
                    },
                    suggest : [{
                        messageId : "suggestion",
                        data      : { expected },
                        fix       : (fixer) => fixer.replaceText(tokens[0], expected),
                    }],
                });
            });
        };
      
        return {
            [`:expression[callee.name="derived"][arguments.0.type="Identifier"]`] : (node) => {
                const [ input, callback ] = node.arguments;
              
                if(callback.params[0].type !== "Identifier") {
                    return;
                }
              
                check([ input ], [ callback.params[0] ]);
            },
          
            [`:expression[callee.name="derived"][arguments.0.type="ArrayExpression"]`] : (node) => {
                const [ inputs, callback ] = node.arguments;
            
                if(callback.params[0].type !== "ArrayPattern") {
                    return;
                }
            
                // Collect input store names
                const sources = [];

                for(const input of inputs.elements) {
                    if(input.type !== "Identifier") {
                        return;
                    }

                    sources.push(input);
                }

                // Collect output store names
                const values = [];

                for(const output of callback.params[0].elements) {
                    if(output.type !== "Identifier") {
                        return;
                    }

                    values.push(output);
                }

                check(sources, values);
            },
        };
    },
};
