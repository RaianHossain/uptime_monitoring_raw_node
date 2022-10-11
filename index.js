const http = require('http');
const handleReqRes = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');
const data = require('./lib/data');

const app = {};

// @TODO: should we removed
// data.update('test', 'newFile', {name: "England", language: "English"}, (err) => {
//     if(err) { 
//         console.log(`Error was`, err);
//     }
// })


app.createServer = () => {
    const server = http.createServer(handleReqRes.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`Listening to port ${environment.port}`);
    })
}



app.createServer();