/*
request handlers
*/

// Dependencies

// Define the handlers
const handlers = {};

// ping handlers
handlers.ping = (data, callback) => {
    // callback http status code, and a payload object
    callback(200);
};

// Not found handlers
handlers.notFound = (data, callback) => {
    // callback http status code, and a payload object
    callback(404);
};

// exports the module
module.exports = handlers; 
