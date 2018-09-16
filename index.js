/**
 * Server
 */
var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res) {
    
    var parseUrl = url.parse(req.url, true);
    var path = parseUrl.pathname;
    var method = req.method.toLowerCase();
    var trimmedPath = path.replace(/^\/+|\/+&/g,'');

    // console.log(`trimmedPath: ${trimmedPath}`);

    var routerHandlerFn = typeof(routerHandler[trimmedPath]) !== 'undefined' ? routerHandler[trimmedPath] : routerHandler.notFound;

    var data = {
        path: trimmedPath,
        method
    };

    routerHandlerFn(data, function(statusCode, payload) {

        statusCode = typeof(statusCode) === 'number' ? statusCode : 404;
        payload = typeof(payload) === 'object' ? payload : {};

        var responseString = '';
        if (payload.name) {
            responseString = `Hello ${payload.name}\n`;
        } else {
            responseString = 'Not Found\n';
        }

        res.writeHead(statusCode);
        res.end(responseString);
    });
});
server.listen(3000, function() {
    console.log('The server is listening on port 3000');
});

var routerHandler = {};

routerHandler.notFound = function(data, callback) {
    callback(404, );
}
routerHandler.hello = function(data, callback) {
    // console.log('hello');
    // console.log('data', data);
    callback(200, { name: 'Pirple' });
}