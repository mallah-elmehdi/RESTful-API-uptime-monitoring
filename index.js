// Dependencies
const http =  require('http');
const url =  require('url');

// the server should respond to all request with a string
const server = http.createServer((req, res) => {

    // Get the URL nad parse it
    console.log("ppppppppppp");
    var parseUrl = url.parse(req.url, true);

    // Get the path
    var path = parseUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/$/g, '')

    // Get the query string as an object
    var queryStringObject = parseUrl.query;

    //  Get the HTTP method
    var method = req.method.toLowerCase();

    // Send the request
    res.end("hello from the server");

    // Log the request path
    console.log("url : " + trimmedPath + ", method : " + method + ", query : ", queryStringObject);

})

// start the server and have it listen on port 300
server.listen(3000, () => {
    console.log("The server is running...");
})
