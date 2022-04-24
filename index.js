// Dependencies
const http =  require('http');
const url =  require('url');
const StringDecoder =  require('string_decoder').StringDecoder;
const config = require('./config');

// the server should respond to all request with a string
const server = http.createServer((req, res) => {

    // Get the URL nad parse it
    var parseUrl = url.parse(req.url, true);

    // Get the path
    var path = parseUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/$/g, '')

    // Get the query string as an object
    var queryStringObject = parseUrl.query;

    //  Get the HTTP method
    var method = req.method.toLowerCase();

    // Get the header as an object
    var headers = req.headers;

    // Get the payload, if any
    var decoder = new StringDecoder("utf-8");
    var buffer = "";
    req.on("data", (data) => {
        buffer += decoder.write(data);
    });
    req.on("end", () => {
        buffer += decoder.end();

        // choose the handler this request should go to.
        var chosenHandler = typeof(router[trimmedPath]) !== "undefined" ? router[trimmedPath] : handlers.notFound;

        // construct the data object to send to the handler
        var data = {
            "trimmedPath": trimmedPath,
            "queryStringObject": queryStringObject,
            "method": method,
            "headers": headers,
            "payload": buffer
        };

        // route the request to the handler specified in the router
        chosenHandler(data, (statusCode, payload) => {
            // use the statusCode called by the handler, or default to 200
            statusCode = typeof(statusCode) === "number" ? statusCode : 200;

            // use the payload called by the handler, or default to empty object
            payload = typeof(payload) === "object" ? payload : {};

            // convert the payload to string
            var payloadString = JSON.stringify(payload);

            // return a response
            res.setHeader("Content-type", "application/json");
            res.writeHead(statusCode);
            res.end(payloadString);

            // Log the request path
            console.log(statusCode + " - " + payloadString);
        })

    });
})

// Define the handlers
const handlers = {};

// Sample handlers
handlers.sample = (data, callback) => {
    // callback http status code, and a payload object
    callback(406, {"name": "sample handler"});
};

// Not found handlers
handlers.notFound = (data, callback) => {
    // callback http status code, and a payload object
    callback(404);
};

// Define a request router
const router = {
    "sample" : handlers.sample
};

// start the server
server.listen(config.port, () => {
    console.log("The server is running on port " + config.port + " on mode " + config.envName);
});
