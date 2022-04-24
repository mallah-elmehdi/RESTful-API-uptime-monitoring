/*
helper for verious tasks
*/

// Dependencies
const crypto = require('crypto');
const config = require('../config')

// container for helpers
const helpers = {};

// hash
helpers.hash = (str) => {
    if (typeof(str) === "string" && str.length > 0) {
        return crypto.createHmac('cha256', config.hashingSecret).update(str).degest("hex");
    } else {
        return false;
    }
}

// parseJsonToObject
helpers.parseJsonToObject = (str) => {
    try {
        var obj = JSON.parse(str);
        return obj;
    } catch (e) {
        return {};
    }
}

// export the module
module.export = helpers;
