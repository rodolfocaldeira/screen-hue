// ==========================================================================
// Screen Hue
// ==========================================================================

// including modules
var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    static = require('node-static');

var fileServer = new static.Server('./public/');

app.listen(8080);

function handler (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    });
}

// don't show the debug messages
io.set('log level', 1);

var connectedScreens = 0;

io.sockets.on('connection', function (socket) {

    var updateConnectedScreens = function() {
        io.sockets.emit('updateConnectedScreens', connectedScreens);
        console.log('Connected screens = ' + connectedScreens);
    };

    connectedScreens++;
    updateConnectedScreens();

    socket.on('updateColor', function (content) {
        io.sockets.emit('updateColor', content);
    });

    socket.on('updateMessage', function (content) {
        io.sockets.emit('updateMessage', content);
    });

    socket.on('disconnect', function () {
        connectedScreens--;
        updateConnectedScreens();
    });

});