// Dependencies
const http =  require('http');
const url =  require('url');
const StringDecoder =  require('string_decoder').StringDecoder;

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

        // Send the request
        res.end("hello from the server");

        // Log the request path
        console.log(buffer);
    });
})

// start the server and have it listen on port 300
server.listen(3000, () => {
    console.log("The server is running...");
})
