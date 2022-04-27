/*
The entrypoint file for this project
*/

// Dependencies
const http =  require('http');
const https =  require('https');
const url =  require('url');
const StringDecoder =  require('string_decoder').StringDecoder;
const fs = require('fs');
const config = require('./config');
const handlers = require('./lib/handlers');
const helpers = require('./lib/helpers');

// Define a request router
const router = {
    "ping" : handlers.ping,
    "users" : handlers.users,
};

// all server logic for http and https
const unifiedServer = (req, res) => {

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
            "payload": helpers.parseJsonToObject(buffer),
        };

        // route the request to the handler specified in the router
        chosenHandler(data, (statusCode, payload) => {
            // use the statusCode called by the handler, or default to 200
            statusCode = typeof(statusCode) === "number" ? statusCode : 200;

            // use the payload called by the handler, or default to empty object
            payload = typeof(payload) === "object" ? payload : {};

            // convert the payload to string
            var payloadString = JSON.stringify(payload);

            // check if the path is "/" then send the (home page) html page else return a json
            if (path === "/") {

                // read the html file and send it to the user
                fs.readFile('./static/index.html', (err, file) => {
                    if (!err) {
                        res.writeHeader(200, {"Content-type": "text/html"});
                        res.write(file);
                        res.end();
                    } else {
                        res.end({"Error": err});
                        console.log(err);
                    }
                })
            } else {

                // return a response
                res.setHeader("Content-type", "application/json");
                res.writeHead(statusCode);
                res.end(payloadString);

                // Log the request path
                console.log(statusCode + " - " + payloadString);
            }
        })

    });
}

// init the http server
const httpServer = http.createServer((req, res) => {
    unifiedServer(req, res);
})

// start the httpServer
httpServer.listen(config.httpPort, () => {
    console.log("The server is running on port " + config.httpPort + " on mode " + config.envName);
});

// init the https server
const httpsServerOption = {
    "key": fs.readFileSync("./https/key.pem"),
    "cert": fs.readFileSync("./https/cert.pem"),
};
const httpsServer = https.createServer(httpsServerOption ,(req, res) => {
    unifiedServer(req, res);
});

// start the httpsServer
httpsServer.listen(config.httpsPort, () => {
    console.log("The server is running on port " + config.httpsPort + " on mode " + config.envName);
});
