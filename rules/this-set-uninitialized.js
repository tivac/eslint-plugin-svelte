"use strict";


module.exports = {
    meta : {
        docs : {
            description : `Warn about calling this.set() for properties which don't have an initial value`,
            category    : "Best Practices",
            recommended : false,
        },
        schema   : [],
        messages : {
            uninitialized : `Found a property being set without an initial value in "data"`,
        },
    },

    create(context) {
        return {
            
        };
    },
};
