const express = require('express')                  //express->web framework
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000               //if we hv environment variable named PORT 
                                                   //then used process o.t. uses 3000
                                                   /*web socket socket.io  lib, html, css, nodejs used in app*/ 

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

// Set static folder
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)            //Socket.IO is a library that enables
                                      //  real-time, bidirectional and event-based communication
                               // between the browser and the server. 
                               //It consists of: a Node. js server
                               // socket server wprks on http

io.on('connection', (socket) => {
    console.log('Connected...')                    // receive msg on server from client
                                                   //then send msges back to clients except that client who send msges
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})