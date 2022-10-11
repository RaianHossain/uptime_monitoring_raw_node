const url = require('url');
const {StringDecoder} = require('string_decoder');
const routes = require('../routes');
const {notFoundHandler} = require('../handlers/routesHandler/notFoundHandler');

const handleReqRes = {};

handleReqRes.handleReqRes = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;
    // console.log(parsedUrl.pathname);

    const requestProperties = {
        parsedUrl,
        path, 
        trimmedPath,
        method,
        queryStringObject,
        headersObject
    }

    // console.log(trimmedPath);
    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    req.on('data', (buffer) => {
        realData += decoder.write(buffer)
    })

    req.on('end', () => {
        realData += decoder.end();

        chosenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof statusCode === 'number' ? statusCode : 500;
            payload = typeof payload === 'object' ? payload : {};
    
            const payloadString = JSON.stringify(payload);
    
            res.writeHead(statusCode);
            res.end(payloadString);
        })
        // console.log(realData);
    })

    // res.end("Hello check");
}

module.exports = handleReqRes;