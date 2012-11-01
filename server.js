var httpd = require('http').createServer(handler);
var io = require('socket.io').listen(httpd);
var fs = require('fs');
httpd.listen(4000);

function handler(req, res) {
    if(req.url === '/admin') {
        readFile(req, res, '/public/admin.html');
    }
    else {
        readFile(req, res, '/public/index.html');
    }
}

function readFile(req, res, filename) {
    fs.readFile(
        __dirname + filename,
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200);
            res.end(data);
        }
    );
}

io.sockets.on('connection', function (socket) {
    socket.on('my event', function (content) {
        console.log(content);
    });

    socket.on('message', function (content) {
        io.sockets.emit('message', content);
    });
});